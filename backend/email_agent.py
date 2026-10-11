
from pathlib import Path
import pandas as pd

DATASET_PATH = Path(__file__).parent / "revops_agent_email_dataset.csv"


def load_email_dataset():
    if not DATASET_PATH.exists():
        raise FileNotFoundError(
            f"Email dataset not found: {DATASET_PATH}"
        )

    df = pd.read_csv(DATASET_PATH)

    required_columns = [
        "customer_id",
        "customer_name",
        "email_address",
        "email_subject",
        "email_body",
        "churn_risk",
        "recommended_offer",
        "call_to_action",
        "email_status",
    ]

    missing = [col for col in required_columns if col not in df.columns]
    if missing:
        raise ValueError(f"Missing columns: {missing}")

    return df


if __name__ == "__main__":
    df = load_email_dataset()

    print("Email dataset loaded successfully!")
    print("Total records:", len(df))
    print("\nChurn risk distribution:")
    print(df["churn_risk"].value_counts(dropna=False))

    print("\nFirst email preview:")
    print("Customer:", df.iloc[0]["customer_name"])
    print("To:", df.iloc[0]["email_address"])
    print("Subject:", df.iloc[0]["email_subject"])
    print("Body:")
    print(df.iloc[0]["email_body"])


    # Preview a high-risk customer's email
    high_risk = df[df["churn_risk"].str.strip().str.lower() == "high"]

    print("\nHigh-risk customers:", len(high_risk))
    print("\nHigh-risk email preview:")

    if not high_risk.empty:
        customer = high_risk.iloc[0]

        print("Customer:", customer["customer_name"])
        print("To:", customer["email_address"])
        print("Subject:", customer["email_subject"])
        print("Recommended offer:", customer["recommended_offer"])
        print("Call to action:", customer["call_to_action"])
        print("Body:")
        print(customer["email_body"])
