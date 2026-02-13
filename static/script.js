function updateValue(id, value) {
    document.getElementById(id).innerText = value;
}

async function submitData() {

    const data = {
        Name: document.getElementById("Name").value,
        Gender: document.getElementById("Gender").value,
        EthnicGroup: document.getElementById("EthnicGroup").value,
        ParentEduc: document.getElementById("ParentEduc").value,
        LunchType: document.getElementById("LunchType").value,
        TestPrep: document.getElementById("TestPrep").value,
        ParentMaritalStatus: document.getElementById("ParentMaritalStatus").value,
        PracticeSport: document.getElementById("PracticeSport").value,
        IsFirstChild: document.getElementById("IsFirstChild").value,
        NrSiblings: document.getElementById("NrSiblings").value,
        TransportMeans: document.getElementById("TransportMeans").value,
        WklyStudyHours: document.getElementById("WklyStudyHours").value,
        MathScore: document.getElementById("MathScore").value,
        ReadingScore: document.getElementById("ReadingScore").value,
        WritingScore: document.getElementById("WritingScore").value
    };
    if (!data.Name || !data.Gender) {
        alert("⚠ Name & Gender are required");
        return;
    }

   try {
    const response = await fetch(
        "https://student-data-dvl4.onrender.com/add_student",
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        }
    );

    const result = await response.json();
    alert(result.message || result.error);

} catch (error) {
    alert(" Server not running");
}

