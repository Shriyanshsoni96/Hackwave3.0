
import pandas as pd
from pymongo import MongoClient, ASCENDING
from pymongo.errors import BulkWriteError
from datetime import datetime
import math

# 1. Connect to local MongoDB
client = MongoClient(
    "mongodb://127.0.0.1:27017",
    serverSelectionTimeoutMS=5000
)

client.admin.command("ping")
print("MongoDB connected successfully!")

# 2. Select database and collection
db = client["reviveai"]
collection = db["customer_monthly"]

# 3. Read the existing dataset
df = pd.read_parquet("user_monthly.parquet")

print("Dataset shape:", df.shape)
print("Preparing records...")

# 4. Prevent accidental duplicate imports
if collection.count_documents({}) > 0:
    print(
        "Collection already contains data. "
        "Import cancelled to prevent duplicates."
    )
    client.close()
    raise SystemExit(0)

# 5. Convert rows into MongoDB-compatible documents
records = df.to_dict(orient="records")
documents = []

for record in records:
    clean_record = {}

    for key, value in record.items():
        if pd.isna(value):
            clean_record[key] = None
        elif isinstance(value, pd.Timestamp):
            clean_record[key] = value.to_pydatetime()
        elif hasattr(value, "item"):
            clean_record[key] = value.item()
        else:
            clean_record[key] = value

    documents.append(clean_record)

# 6. Ensure one record per user per month
collection.create_index(
    [("user_id", ASCENDING), ("month", ASCENDING)],
    unique=True
)

# 7. Insert records in batches
batch_size = 2000

for start in range(0, len(documents), batch_size):
    batch = documents[start:start + batch_size]
    collection.insert_many(batch)
    print(
        f"Imported {min(start + batch_size, len(documents))}"
        f"/{len(documents)} records"
    )

# 8. Verify import
print("\nImport completed!")
print("Total imported:", collection.count_documents({}))
print("Collections:", db.list_collection_names())

client.close()
