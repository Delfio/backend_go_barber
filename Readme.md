# Funcionalidades

## Recuperação de senha

**RF**
 - O usuario deve poder recuperar sua senha informando o seu e-mail - OK
 - O usuario deve receber um e-mail com instruções com recuperação de senha - OK
 - O usuario deve poder resetar sua senha - OK

**RNF**
 - Mailtrap para testar envio de e-mails em desenvolvimento - OK
 - Utilizar o Amazon SES para envios em produção
 - O envio de e-mails deve acontecer em segundo plano (background job)


**RN**
 - O link enviado por e-mail para resetar a senha deve expirar em 2h - OK
 - O usuario precisa confirmar a nova senha ao resetar a mesma


## Atualização do perfil

**RF**

 - O usuario deve poder atualizar seu nome, e-mail e senha

**RN**
 - O usuário não deve poder alterar seu e-mail para um e-mail já utilizado
 - Para atualizar sua senha o usuário deve informar a senha antiga
 - Para atualizar sua senha o usuário deve confirmar a nova senha

## Painel do prestador
**RF**

 - O usuário deve poder visualizar todos os seus agendamentos de um dia específico
 - O prestador deve receber uma notificação sempre que houver um novo agendamento
 - O prestador deve poder visualizar as notificações não lidas


**RNF**

 - Os agendamentos do prestador no dia devem ser armazenados em cache
 - As notificações do prestador devem ser armazenadas no MongoDB
 - As notificações do prestador devem ser enviadas em tempo real (socket.io)

**RN**
 - A notificação deve ter um status de lida ou não lida para que o prestador possa ter um controle sobre as mesmas


## Agendamento de serviços
**RF**

 - O usuário deve poder listar todos os prestadores de serviços cadastrados
 - O usuário deve poder listar os dias de um mês com pelo menos um horário disponível do prestador selecionado
 - O usuário deve poder listar horários disponíveis em um dia específico de um prestador
 - O usuário deve poder realizar um novo agendamento com um prestador

**RNF**
 - A listagem de prestadores devem ser armazenada em cache

**RN**

 - Cada agendamento deve durar 1h exatamente
 - Os agendamentos devem setar disponíveis entre as 8h às 18h (Primeiro às 8h, último às 17h)
 - O usuário não deve poder agendar um serviço em um horário já ocupado
 - O usuário não deve poder agendar um serviço em um horário que já passou
 - O usuário não pode agendar serviços consigo mesmo
