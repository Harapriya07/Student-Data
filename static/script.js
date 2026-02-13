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
        IsFirstChild: parseInt(document.getElementById("IsFirstChild").value) || 0,
        NrSiblings: parseInt(document.getElementById("NrSiblings").value) || 0,
        TransportMeans: document.getElementById("TransportMeans").value,
        WklyStudyHours: parseInt(document.getElementById("WklyStudyHours").value) || 0,
        MathScore: parseInt(document.getElementById("MathScore").value) || 0,
        ReadingScore: parseInt(document.getElementById("ReadingScore").value) || 0,
        WritingScore: parseInt(document.getElementById("WritingScore").value) || 0
    };

    
    if (!data.Name || !data.Gender) {
        alert(" Name & Gender are required");
        return;
    }

    console.log("Sending data:", data); 

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

        if (response.ok) {
            alert(result.message);  
        } else {
            alert(" Backend Error: " + result.error);
            console.error("Backend Error:", result);
        }

    } catch (error) {
        console.error("Fetch Error:", error);
        alert("🚨 Server Error / Backend Sleeping");
    }
}

