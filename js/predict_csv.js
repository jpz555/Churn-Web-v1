document.addEventListener("DOMContentLoaded", () => {
    let fileInput = document.getElementById("csvFile");
    let downloadDiv = document.getElementById("download");
    let button = document.getElementById("button__enviar");

    button.addEventListener("click", async () => {
        downloadDiv.innerHTML = "";

        let file = fileInput.files[0];

        if (!file) {
            downloadDiv.innerHTML = "<p style='color:red;'>Seleccione un Archivo CSV</p>";
            return;
        }

        if (!file.name.endsWith(".csv")) {
            downloadDiv.innerHTML = "<p style='color:red;'>El Archivo debe ser CSV</p>";
            return;
        }

        try {
            setLoading(button, true) 
            let blob = await predictCSV(file);
            let url = URL.createObjectURL(blob);

            downloadDiv.innerHTML = `
                <a href="${url}" download="predicciones.csv" class="btn btn__secondary">
                Descargar Resultados
                </a>
                `;
            } catch(error) {
                downloadDiv.innerHTML = `<p style='color:red;'>${error.message}</p>`;
            
            } finally {
                setLoading(button, false);
            
            }

    });
});