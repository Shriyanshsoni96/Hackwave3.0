
# ============================================================
# Autonomous RevOps Agent
# Step 1: Dataset Connection and Verification
# ============================================================

from pathlib import Path
from sklearn.metrics import precision_score, recall_score
MODEL_PATH = Path(__file__).resolve().parent / 'churn_model.joblib'

import joblib

import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    classification_report,
    confusion_matrix,
    average_precision_score,
    roc_auc_score
)


# Dataset file is in the same folder as train.py
BASE_DIR = Path(__file__).resolve().parent
DATASET_PATH = BASE_DIR / "user_monthly.parquet"


def load_dataset():
    """Load and verify the SaaS churn dataset."""

    print("=" * 55)
    print("AUTONOMOUS REVOPS AGENT")
    print("=" * 55)

    print("\nChecking dataset file...")

    if not DATASET_PATH.exists():
        raise FileNotFoundError(
            f"\nDataset not found: {DATASET_PATH}\n"
            "Place user_monthly.parquet in the project folder."
        )

    df = pd.read_parquet(DATASET_PATH)

    # Required columns
    required_columns = [
        "user_id",
        "month",
        "churned",
        "churned_next_month"
    ]

    missing_columns = [
        col for col in required_columns
        if col not in df.columns
    ]

    if missing_columns:
        raise ValueError(
            f"Required columns missing: {missing_columns}"
        )

    print("\nDataset connected successfully!")

    print("\nDataset shape:", df.shape)
    print("Total rows:", len(df))
    print("Total columns:", len(df.columns))
    print("Unique customers:", df["user_id"].nunique())

    print("\nAll columns:")
    print(df.columns.tolist())

    print("\nMissing values per column:")
    print(df.isnull().sum())

    print("\nTotal missing values:", df.isnull().sum().sum())
    print("Duplicate rows:", df.duplicated().sum())

    print("\nDate range:")
    print(df["month"].min(), "to", df["month"].max())

    print("\nTarget distribution:")
    print(df["churned_next_month"].value_counts().sort_index())

    print("\nTarget percentage:")
    print(
        (df["churned_next_month"].value_counts(normalize=True)
         .sort_index() * 100).round(2)
    )

    print("\nFirst 5 rows:")
    print(df.head().to_string())

    return df


def prepare_features(df):
    """Prepare features and target for future training."""

    target = "churned_next_month"

    # Exclude identifiers, date, current churn and target
    drop_columns = [
        "user_id",
        "month",
        "churned",
        target
    ]

    X = df.drop(columns=drop_columns)
    y = df[target]

    return X, y


def split_data_by_date(df):
    """Split data chronologically into training and testing sets."""

    df = df.copy()
    df["month"] = pd.to_datetime(df["month"])

    # December 2025 ko abhi exclude karenge
    df = df[df["month"] < "2025-12-01"]

    # September 2025 se pehle = training data
    train_df = df[df["month"] < "2025-09-01"]

    # September to November 2025 = testing data
    test_df = df[
        (df["month"] >= "2025-09-01") &
        (df["month"] < "2025-12-01")
    ]

    print("\nTRAIN-TEST SPLIT")
    print("-" * 40)
    print("Training rows:", len(train_df))
    print("Testing rows:", len(test_df))
    print("Training date range:",
          train_df["month"].min(), "to", train_df["month"].max())
    print("Testing date range:",
          test_df["month"].min(), "to", test_df["month"].max())

    print("\nTraining target distribution:")
    print(train_df["churned_next_month"].value_counts())

    print("\nTesting target distribution:")
    print(test_df["churned_next_month"].value_counts())

    return train_df, test_df



def build_model(X):
    """Create a preprocessing and Random Forest pipeline."""

    categorical_columns = X.select_dtypes(
        include=["object", "category", "string"]
    ).columns.tolist()

    numeric_columns = X.select_dtypes(
        include=["number"]
    ).columns.tolist()

    preprocessor = ColumnTransformer([
        (
            "num",
            SimpleImputer(strategy="median"),
            numeric_columns
        ),
        (
            "cat",
            Pipeline([
                (
                    "imputer",
                    SimpleImputer(strategy="most_frequent")
                ),
                (
                    "encoder",
                    OneHotEncoder(handle_unknown="ignore")
                )
            ]),
            categorical_columns
        )
    ])

    model = Pipeline([
        ("preprocessor", preprocessor),
        (
            "classifier",
            RandomForestClassifier(
                n_estimators=200,
                class_weight="balanced",
                random_state=42,
                n_jobs=-1
            )
        )
    ])

    return model


def evaluate_model(y_test, predictions, probabilities):
    """Evaluate churn prediction performance."""

    print("\nClassification Report:")
    print(
        classification_report(
            y_test,
            predictions,
            zero_division=0
        )
    )

    print("\nConfusion Matrix:")
    print(confusion_matrix(y_test, predictions))

    print(
        "\nPR-AUC:",
        round(average_precision_score(y_test, probabilities), 4)
    )

    if y_test.nunique() == 2:
        print(
            "ROC-AUC:",
            round(roc_auc_score(y_test, probabilities), 4)
        )


if __name__ == "__main__":
    df = load_dataset()

    train_df, test_df = split_data_by_date(df)

    X_train, y_train = prepare_features(train_df)
    X_test, y_test = prepare_features(test_df)

    model = build_model(X_train)

    print("\nTraining Random Forest model...")
    model.fit(X_train, y_train)
    print("Model training completed.")

    joblib.dump(model, MODEL_PATH)
    print(f"Model saved successfully: {MODEL_PATH}")

    probabilities = model.predict_proba(X_test)[:, 1]

    print("\nThreshold Comparison:")
    print(f"{'Threshold':<12}{'Predicted Churn':<20}{'Precision':<12}{'Recall':<12}")

    for threshold in [0.01, 0.02, 0.05, 0.10, 0.20, 0.50]:
        predictions = (probabilities >= threshold).astype(int)
        precision = precision_score(y_test, predictions, zero_division=0)
        recall = recall_score(y_test, predictions, zero_division=0)

        print(
            f"{threshold:<12.2f}{int(predictions.sum()):<20}"
            f"{precision:<12.3f}{recall:<12.3f}"
        )

    final_predictions = (probabilities >= 0.50).astype(int)

    print("\nFinal Evaluation:")
    evaluate_model(y_test, final_predictions, probabilities)




