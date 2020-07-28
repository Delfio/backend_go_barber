# Single Responsability principle

* A fim de seguir o princípio do S - SOLID.
* Responsável por gerenciar a estratégia de criação de hash da aplicação.

```
HashProvider
    ---fakes
        --- Implementação falsa para testagem
    ---implementations
        --- Bibliotecas ou formas de implementações.
            --- BcryptJS
    ---models
        --- Interface que diz quais métodos que o serviço de hash precisa ter.
            --- CriarHash()
            --- VerificarVeracidadeDoHash()
```
