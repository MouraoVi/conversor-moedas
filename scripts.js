// Cotação de moedas do dia
const USD = 5.02
const EUR = 5.87
const GBP = 6.77

// Obtendo os elementos
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

// manipulando o input amount para receber somente números
amount.addEventListener("input", () => {
    const hasCharactersRegex = /\D+/g
    amount.value = amount.value.replace(hasCharactersRegex, "")
})

// capturando o evento de submit do formulário
form.onsubmit = (event) => {
    event.preventDefault()

    switch (currency.value) {
        case "USD":
            convertCurrency(amount.value, USD, "US$")
            break;
        case "EUR":
            convertCurrency(amount.value, EUR, "€")
            break;
        case "GBP":
            convertCurrency(amount.value, GBP, "£")
            break;
    }
}

// Função para converter a moeda
function convertCurrency(amount, price, symbol) {
    try {
        // exibindo a cotação da moeda
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

        let total = amount * price

        // verifica se não é um número
        if (isNaN(total)) {
            return alert("Por favor, digite o valor corretamente para converter.")
        }

        total = formatCurrencyBRL(total).replace("R$", "")
        result.textContent = `${total} Reais`

        // aplica a classe que exibe o footer
        footer.classList.add("show-result")

    } catch (error) {
        // remove a classe que exibe o footer
        console.log(error);
        footer.classList.remove("show-result")
        alert("Não foi possivel converter.")
    }
}

// formata a moeda para real brasileiro
function formatCurrencyBRL(value) {
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
}