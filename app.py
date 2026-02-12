from flask import Flask, request, jsonify
from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# ✅ DATABASE CONNECTION
try:
    engine = create_engine(
        "mysql+pymysql://root:@localhost/student_db"

    )
    print("✅ Database Connected")

except Exception as e:
    print("❌ Database Connection Failed")
    print(e)


# ✅ INSERT API
@app.route("/add_student", methods=["POST"])
def add_student():

    try:
        data = request.json

        with engine.connect() as conn:

            query = text("""
                INSERT INTO student_performance (
                    Name,
                    Gender,
                    EthnicGroup,
                    ParentEduc,
                    LunchType,
                    TestPrep,
                    ParentMaritalStatus,
                    PracticeSport,
                    IsFirstChild,
                    NrSiblings,
                    TransportMeans,
                    WklyStudyHours,
                    MathScore,
                    ReadingScore,
                    WritingScore
                )
                VALUES (
                    :Name,
                    :Gender,
                    :EthnicGroup,
                    :ParentEduc,
                    :LunchType,
                    :TestPrep,
                    :ParentMaritalStatus,
                    :PracticeSport,
                    :IsFirstChild,
                    :NrSiblings,
                    :TransportMeans,
                    :WklyStudyHours,
                    :MathScore,
                    :ReadingScore,
                    :WritingScore
                )
            """)

            conn.execute(query, data)
            conn.commit()

        return jsonify({"message": "✅ Data Inserted Successfully"})

    except SQLAlchemyError as e:
        print("🔥 INSERT ERROR:", e)
        return jsonify({"error": str(e)}), 500


# ✅ FETCH LAST 5 RECORDS (Optional — Useful Later)
@app.route("/students", methods=["GET"])
def get_students():

    try:
        with engine.connect() as conn:

            result = conn.execute(text("""
                SELECT * FROM student_performance
                ORDER BY Timestamp DESC
                LIMIT 5
            """))

            rows = [dict(row._mapping) for row in result]

        return jsonify(rows)

    except SQLAlchemyError as e:
        print("🔥 FETCH ERROR:", e)
        return jsonify({"error": "Fetch failed"}), 500


# ✅ RUN SERVER
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
