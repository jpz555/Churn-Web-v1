function goHome() {
    window.location.href = "home.html";
}

function showMessage(containerId, html, type="info"){
    let el = document.getElementById(containerId);
    el.className = "";
    el.classList.add(`result-${type}`)
    el.innerHTML = html;
}

function setLoading(button, isLoading){
    if (isLoading) {
        button.disabled = true;
        button.dataset.originalText = button.textContent;
        button.textContent = "Procesando...";
    } else {
        button.disabled = false;
        button.textContent = button.dataset.originalText;
    }
}

function getRiskLevel(probability) {
    let risk= "bajo"
    
    if (probability >= 0.7) {
        risk = "alto"
    } if (probability >= 0.4 && probability < 0.7) {
        risk = "medio"
    }
    return risk
}

