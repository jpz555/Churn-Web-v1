document.addEventListener("DOMContentLoaded", () =>  {
    let form = document.getElementById("predictForm");
    let resultDiv = document.getElementById("result");
    let submitBtn = form.querySelector("button[type='submit']");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        resultDiv.innerHTML = "";

        let formData = new FormData(form)
        let data = Object.fromEntries(formData.entries());
        
        // Conversión explícita a números
        [
        "Age",
        "Balance",
        "CreditScore",
        "EstimatedSalary",
        "HasCrCard",
        "IsActiveMember",
        "NumOfProducts",
        "Tenure"
        ].forEach(key => data[key] = Number(data[key]));

        try {
            setLoading(submitBtn, true);

            let result = await predictIndividual(data);
            console.log("Resultado", result);
         
            let probability = result.probability;
            let probPercent = (probability * 100).toFixed(2);
            // let risk = "low";
            // if((probability / 100) > 0.7) risk = "high";
            // else if ((probability/100) > 0.4) risk = "medium";

            let risk = getRiskLevel(probability);
            console.log(risk)

            resultDiv.className = `result-${risk}`;
            resultDiv.innerHTML = `
            <h3>Resultado</h3>
            <p><strong>Predicción: </strong> ${result.prediction == 1 ? "Va a cancelar": "No va a Cancelar"}</p>
            <p><strong>Probabilidad: </strong>${probPercent}%</p>
            <p><strong>Riesgo: </strong>${risk.charAt(0).toUpperCase() + risk.slice(1)}</p>`;

        } catch (error) {
            resultDiv.innerHTML = `
                <p style="color:red;">${error.message}</p>`;
        } finally {
            setLoading(submitBtn, false);
            resultDiv.style.display = "block";
        }
    
    })

}
    


)