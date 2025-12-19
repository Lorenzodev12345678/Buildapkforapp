window.onload = function() {
    // 1. Pegar todos os elementos
    var inputDoc = document.getElementById('hiddenInput');
    var fotoPreview = document.getElementById('imgPreview');
    var textoAviso = document.getElementById('textInfo');
    var botaoFoto = document.getElementById('trigger');

    // 2. Abrir galeria (Sistema Simplificado)
    if (botaoFoto && inputDoc) {
        botaoFoto.onclick = function() {
            inputDoc.click();
        };

        inputDoc.onchange = function(e) {
            var file = e.target.files[0];
            if (file) {
                var reader = new FileReader();
                reader.onload = function(event) {
                    fotoPreview.src = event.target.result;
                    fotoPreview.style.display = 'block';
                    if (textoAviso) textoAviso.style.display = 'none';
                };
                reader.readAsDataURL(file);
            }
        };
    }
};

// 3. Função do Botão (Fica fora do onload para o HTML achar)
function initGenerator() {
    var nome = document.getElementById('nameInput').value;
    var link = document.getElementById('urlInput').value;
    
    if (!nome || !link) {
        alert("Ei! Digite o nome e o link primeiro.");
        return;
    }

    var bar = document.getElementById('pBar');
    var box = document.getElementById('pBox');
    var status = document.getElementById('labelStatus');
    var final = document.getElementById('finalSection');
    var dl = document.getElementById('downloadLink');

    if (box) box.style.display = 'block';
    if (final) final.style.display = 'none';

    var p = 0;
    var timer = setInterval(function() {
        p++;
        if (bar) bar.style.width = p + '%';
        if (status) status.innerText = "Criando " + nome + ".apk: " + p + "%";

        if (p >= 100) {
            clearInterval(timer);
            if (status) status.innerText = "✅ Pronto!";
            if (final) final.style.display = 'block';
            if (dl) {
                dl.innerText = "Baixar " + nome + ".apk";
                dl.setAttribute('download', nome + ".apk");
            }
        }
    }, 100);
}
