import inquirer from 'inquirer';
import chalk from 'chalk'
import fs from 'fs'

operation()
function operation() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Oque voçe deseja fazer? ',
            choices:
                [
                    'Criar conta',
                    'Consultar saldo',
                    'Depositar',
                    'Sacar',
                    'Sair'
                ]
        }
    ]).then((answer) => {
        const action = answer['action']
        if (action === 'Criar conta') {
            createAccount()
        } else if (action === 'Depositar') {
            deposit()
        } else if (action === 'Consultar Saldo') {
            getAccountBalance()

        } else if (action === 'Sacar') {
            withDraw()

        } else if (action === 'Sair') {
            console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!'))
            process.exit()
        }
    })

        .catch((err) => console.log(err))
}


//create an account
function createAccount() {
    console.log(chalk.bgGreen.black('Parabens por escolher o nosso banco!'))
    console.log(chalk.green('Defina as opçoes da sua conta '))
    buildAccount()
}


function buildAccount() {
    inquirer.prompt([
        {
            name: 'account name',
            message: 'Digite um nome para sua conta: '
        }
    ]).then((answer) => {
        const accountName = answer['accountName']
        console.info(accountName)

        if (!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts')
        }
        if (fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(
                chalk.bgRed.black('Esta conta ja existe!'),

            )
            buildAccount()
            return
        }

        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance:0"}', function (err) {
            console.log(err)
        })
        console.log(chalk.green('Parabens, sua conta foi criada!'))
        operation()
    })
        .catch((err) => console.log(err))
}

// add an amount to user account
function deposit() {
    inquirer.prompt([
        {
            name: 'actionName',
            message: 'Qual o nome da sua conta'

        }
    ])
        .then((answer) => {
            const accountName = answer['accountName']

            //verify
            if (!checkAccount(accountName)) {
                return deposit()
            }
            inquirer.prompt([
                {
                    name: 'amount',
                    message: 'Valor do deposito'
                },

            ]).then((answer) => {
                const amount = answer['amount']

                //add an amount
                addAmount()
                operation()
            })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
}



function checkAccount() {
    if (!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black('Conta inexistente.'))
        return false
    }

    return true
}




function addAmount(accountName, amount) {
    const accountData = getAccount(accountName)

    if (!amount) {
        console.log('Ocorreu um erro!')
        return deposit()
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)
    fs.writeFileSync(`accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err) {
            console.log(err)
        }
    )
    console.log(chalk.green('DEPOSITO EFETUADO COM SUCESSO!'))
    operation()
}

function getAccount(accountName) {
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf-8',
        flag: 'r'
    })
    return JSON.parse(accountJSON)

}



//show balance
function getAccountBalance() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Nome da conta: '
        },

    ]).then((answer) => {
        const accountName = answer['accountName']
        if (!checkAccount(accountName)) {
            return getAccountBalance()
        }
        const accountData = getAccount(accountName)
        console.log(chalk.green.white(`Saldo R$: ${accountData}`))
        operation()

    }).catch(err => console.log(err))
}


// funçao sacar 
function withDraw() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Nome da conta'
        }
    ]).then((answer) => {
        const accountName = answer['accountName']

        if (!checkAccount(accountName)) {
            return withDraw()
        }
        inquirer.prompt([
            {
                name: 'amount',
                message: 'Valor do saque '
            }
        ]).then((answer) => {
            const amount = answer['amount']

            removeAmount(accountName, amount)
            operation()


        }).catch(err => console.log(err))

    }).catch(err => console.log(err))

}


function removeAmount(accountName, amount) {
    const accountData = getAccount(accountName)

    if (!amount) {
        console.log(chalk.bgRed.black('Ocoreu um erro.'))
        return withDraw()
    }

    if (accountData.balance < amount) {
        console.log(chalk.bgRed.black('Saldo insuficiente'))
        return withDraw()
    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)
    fs.writeFileSync(
        `accounts/${accountName}.json`,
        function (err) {
            console.log(err)
        }
    )

    console.log(chalk.bgGreen('Saque feito com sucesso!'))
}
operation()