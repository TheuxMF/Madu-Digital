Madu Digital — Static One-Page Website
-------------------------------------
O pacote contém uma versão estática (HTML/CSS/JS) pronta para hospedar no GitHub Pages.

Estrutura:
- index.html
- assets/css/styles.css
- assets/js/main.js
- assets/img/logo.png   (sua logo enviada)
- assets/img/hero-bg.png (imagem de destaque enviada)
- apps_script.txt       (exemplo de Google Apps Script para envio de formulário)
- README.txt (este arquivo)

Instruções rápidas:
1) Descompacte o ZIP no seu computador.
2) Teste localmente abrindo index.html no navegador.
3) Para enviar formulários para um Google Sheet:
   - Crie uma planilha no Google Drive.
   - Copie o ID da planilha e substitua em apps_script.txt.
   - Vá em Extensões → Apps Script e crie o script com o conteúdo do apps_script.txt.
   - Implante como Web App (Acesso: Qualquer pessoa, mesmo anônima).
   - Copie a URL do Web App e cole na variável FORM_ENDPOINT em assets/js/main.js
   - OBS: dependendo das configurações CORS, o fetch('no-cors') pode não retornar erro; recomendamos testar.
4) Fazer deploy no GitHub Pages: crie um repositório e envie todo o conteúdo da pasta raiz do projeto. Ative GitHub Pages no branch main / root.
