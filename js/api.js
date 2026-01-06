/* Este archivo centraliza TODAS las llamadas HTTP.
Es una muy buena práctica profesional */


/*Cliente HTTP basico para la api 
*/ 
async function apiRequest(endpoint, options={}) {
    let controller = new AbortController();
    let timeoutId = setTimeout(
        () => controller.abort(),
        API_CONFIG.TIMEOUT
    );

    try {
        let response = await fetch(
            `${API_CONFIG.BASE_URL}${endpoint}`,
            // {
            //     signal: controller.signal,
            //     ...options
            // }
            options
        );
        
        if (!response.ok) {
            let errorText = await response.text();
            throw new Error(errorText || "Error en la API");  
        }

        return response;

    } catch (error) {
        if (error.name == "AbortError") {
            throw new Error("Tiempo de espera agotado");
        }

        throw error;
    } finally {
        clearTimeout(timeoutId);
    }
}

/*Endpoints especificos */

async function predictIndividual(data) {
    let response = await apiRequest("/predict", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });

    return response.json();
}

async function predictCSV(file) {
    let formData = new FormData();
    formData.append("file", file);

    let response = await apiRequest("/predict_csv", {
        method: "POST",
        body: formData
    });
    
    return response.blob();
}


