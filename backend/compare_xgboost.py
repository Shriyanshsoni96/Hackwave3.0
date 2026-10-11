from pathlib import Path

import joblib
import pandas as pd

from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    average_precision_score,
    roc_auc_score,
    precision_score,
    recall_score,
)

from xgboost import XGBClassifier


BASE_DIR = Path(__file__).resolve().parent
DATASET_PATH = BASE_DIR / "user_monthly.parquet"
RF_MODEL_PATH = BASE_DIR / "churn_model.joblib"


def prepare_data():
    df = pd.read_parquet(DATASET_PATH)
    df["month"] = pd.to_datetime(df["month"], errors="coerce")
    df = df.dropna(subset=["month", "churned_next_month"])

    # Use the same chronological split as the existing model.
    df = df[df["month"] < "2025-12-01"]

    train_df = df[df["month"] < "2025-09-01"]
    test_df = df[
        (df["month"] >= "2025-09-01")
        & (df["month"] < "2025-12-01")
    ]

    drop_columns = [
        "user_id", "month", "churned", "churned_next_month"
    ]

    X_train = train_df.drop(columns=drop_columns)
    y_train = train_df["churned_next_month"].astype(int)

    X_test = test_df.drop(columns=drop_columns)
    y_test = test_df["churned_next_month"].astype(int)

    return X_train, y_train, X_test, y_test


def build_xgb_model(X_train, y_train):
    numeric_features = X_train.select_dtypes(
        include=["number"]
    ).columns.tolist()

    categorical_features = X_train.select_dtypes(
        exclude=["number"]
    ).columns.tolist()

    transformers = []

    if numeric_features:
        numeric_pipeline = Pipeline([
            ("imputer", SimpleImputer(strategy="median"))
        ])
        transformers.append(
            ("numeric", numeric_pipeline, numeric_features)
        )

    if categorical_features:
        categorical_pipeline = Pipeline([
            ("imputer", SimpleImputer(strategy="most_frequent")),
            ("encoder", OneHotEncoder(handle_unknown="ignore")),
        ])
        transformers.append(
            ("categorical", categorical_pipeline, categorical_features)
        )

    preprocessor = ColumnTransformer(transformers=transformers)

    negative_count = int((y_train == 0).sum())
    positive_count = int((y_train == 1).sum())

    if positive_count == 0:
        raise ValueError("Training data has no churn cases.")

    xgb = XGBClassifier(
        n_estimators=400,
        max_depth=4,
        learning_rate=0.05,
        subsample=0.8,
        colsample_bytree=0.8,
        min_child_weight=5,
        reg_lambda=2,
        scale_pos_weight=negative_count / positive_count,
        objective="binary:logistic",
        eval_metric="aucpr",
        tree_method="hist",
        random_state=42,
        n_jobs=-1,
    )

    return Pipeline([
        ("preprocessor", preprocessor),
        ("classifier", xgb),
    ])


def show_metrics(name, y_test, probabilities):
    print(f"\n{name}")
    print("-" * 55)
    print(
        "PR-AUC:",
        round(average_precision_score(y_test, probabilities), 4)
    )
    print(
        "ROC-AUC:",
        round(roc_auc_score(y_test, probabilities), 4)
    )

    print("\nThreshold comparison:")
    print("Threshold | Predicted | Precision | Recall")

    for threshold in [0.01, 0.02, 0.05, 0.10, 0.20, 0.50]:
        predictions = (probabilities >= threshold).astype(int)

        precision = precision_score(
            y_test, predictions, zero_division=0
        )
        recall = recall_score(
            y_test, predictions, zero_division=0
        )

        print(
            f"{threshold:9.2f} | "
            f"{int(predictions.sum()):9d} | "
            f"{precision:9.3f} | "
            f"{recall:.3f}"
        )


if __name__ == "__main__":
    X_train, y_train, X_test, y_test = prepare_data()

    print("Training rows:", len(X_train))
    print("Testing rows:", len(X_test))
    print("Training XGBoost model...")

    xgb_model = build_xgb_model(X_train, y_train)
    xgb_model.fit(X_train, y_train)

    xgb_probabilities = xgb_model.predict_proba(X_test)[:, 1]
    show_metrics("XGBOOST RESULTS", y_test, xgb_probabilities)

    print("\nLoading existing Random Forest model...")

    rf_model = joblib.load(RF_MODEL_PATH)
    rf_probabilities = rf_model.predict_proba(X_test)[:, 1]

    show_metrics("RANDOM FOREST RESULTS", y_test, rf_probabilities)

    print("\nComparison completed.")
    print("The existing Random Forest model was not overwritten.")