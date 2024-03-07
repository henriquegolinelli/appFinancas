# appFinancas
Projeto escolar de desenvolvimento de App de controle financeiro
</br></br>

# Antes de iniciar
<p>Para que tudo funcione corretamente, aqui está uma lista do necessário para rodar o projeto:</p>
<ul>
    <li>NodeJS 18.16.0</li>
    <li>JDK 17</li>
    <li>Android Studio</li>
    <ul>
        <li>Android SDK Build-Tools 34</li>
        <li>Android SDK Command-line Tools (latest)</li>
        <li>Android SDK Platform-Tools</li>
    </ul>
</ul>

# Como Instalar
```bash
    # Clone este repositório
    $ git clone https://github.com/henriquegolinelli/appFinancas.git

    # Entre na pasta do projeto
    $ cd appFinancas

    # Mude para a branch dev
    $ git checkout dev

    # Instale as dependências
    $ npm install
```
# Como Executar

## Caso tenha o APP ExpoGo instalado no celular
```bash 
    # Para rodar o projeto
    $ npx expo start
```

<p>Após iniciar o projeto, escaneie o QRCode pelo aplicativo, ou execute o comando <code>shift+a</code> no terminal para escolher o dispositivo a ser executado.</p>

</br>

## Caso não tenha (ou não queira instalar) o app ExpoGo 
<p>OBS: Lembre-se de conectar o celular ao cabo USB e habilitar as seguintes opções no modo desenvolvedor do android:</p>
<ul>
    <li>Depuração USB</li>
    <li>Instalar via USB</li>
</ul>

<p>Execute:</p>

```bash
    # Para executar o projeto
    $ npx expo run:android
```
<p>ou</p>

```bash
    # Para executar o projeto
    $ npm run android
```
<p>Após o projeto ter iniciado, caso deseje executar em outro dispositivo, execute o comando <code>shift+a</code> no terminal para aparecer a lista de dispositivos disponíveis.</p>
