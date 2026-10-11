from pathlib import Path

import joblib
import pandas as pd


# Model path
BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "churn_model.joblib"

FEATURES = [
    "tenure_month",
    "plan_type",
    "monthly_price",
    "mrr",
    "sessions",
    "feature_usage_score",
    "support_tickets",
    "payment_failures",
    "nps_score",
    "product_incident",
    "active_seats",
]


def ask_number(label, default, value_type=float):
    while True:
        value = input(f"{label} [{default}]: ").strip()

        if not value:
            return value_type(default)

        try:
            return value_type(value)
        except ValueError:
            print("Please enter a valid number.")


def predict_customer(model):
    print("\nEnter customer details.")
    print("Press Enter to use the displayed default value.\n")

    customer_id = input(
        "Customer ID [DEMO_CUSTOMER]: "
    ).strip() or "DEMO_CUSTOMER"

    tenure = ask_number("Tenure in months", 6, int)

    plan = input(
        "Plan type [Starter]: "
    ).strip() or "Starter"

    monthly_price = ask_number("Monthly price", 199)
    mrr = ask_number("Monthly recurring revenue", 199)
    sessions = ask_number("Sessions", 8, int)

    usage = ask_number("Feature usage score (0-100)", 25)
    tickets = ask_number("Support tickets", 3, int)
    failures = ask_number("Payment failures", 1, int)
    nps = ask_number("NPS score", 3, int)
    incident = ask_number("Product incident (0 or 1)", 1, int)
    seats = ask_number("Active seats", 1, int)

    customer = pd.DataFrame(
        [[
            tenure,
            plan,
            monthly_price,
            mrr,
            sessions,
            usage,
            tickets,
            failures,
            nps,
            incident,
            seats,
        ]],
        columns=FEATURES,
    )

    probability = float(
        model.predict_proba(customer)[0, 1]
    )

    # Illustrative demo thresholds, not validated business cutoffs.
    if probability >= 0.20:
        risk = "HIGH"
    elif probability >= 0.05:
        risk = "MEDIUM"
    else:
        risk = "LOW"

    print("\n" + "=" * 40)
    print("AUTONOMOUS REVOPS AGENT")
    print("=" * 40)
    print("Customer ID:", customer_id)
    print(f"Churn probability: {probability:.2%}")
    print("Demo risk level:", risk)
    print("=" * 40)


if __name__ == "__main__":
    if not MODEL_PATH.exists():
        raise FileNotFoundError(
            f"Trained model not found: {MODEL_PATH}"
        )

    model = joblib.load(MODEL_PATH)
    print("Trained churn model loaded successfully.")

    while True:
        predict_customer(model)

        again = input(
            "\nPredict another customer? (y/n): "
        ).strip().lower()

        if again != "y":
            print("Demo finished.")
            break