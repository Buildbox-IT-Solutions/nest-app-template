# Documentação Arquitetural do Template

## Motivação do Projeto
Este projeto foi criado para oferecer uma base arquitetural robusta, escalável e de fácil manutenção para novos projetos da empresa. Ele segue um conjunto de tecnologias modernas e padrões de projeto bem estabelecidos para garantir alta qualidade e consistência no desenvolvimento.

---

## Tecnologias Utilizadas

- **NestJS**: Framework Node.js para criação de aplicativos eficientes e escaláveis.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática ao código.
- **Vitest**: Framework de testes rápido e integrado ao ecossistema TypeScript.
- **nestjs-i18n**: Biblioteca para internacionalização (i18n) no NestJS.
- **class-validator**: Biblioteca para validação de dados com decoradores e classes.
- **Prettier e ESLint**: Ferramentas para formatação e padronização de código.
- **lefthook e commitlint**: Ferramentas para controle de commits e hooks no Git.
- **docker-compose**: Orquestração de contêineres Docker.
- **pnpm**: Gerenciador de pacotes rápido e eficiente.
- **Prisma**: ORM para banco de dados.
- **Swagger**: Ferramenta para documentação de APIs REST.

---

## Configuração do Ambiente
1. Instale o Node.js versão 22.12.0.
2. Instale as dependências:
   ```bash
   pnpm install
   ```
3. Prepare os hooks do Git:
   ```bash
   pnpm prepare
   ```
   Este comando executa `lefthook install`, configurando hooks para validar commits e executar testes e lint automaticamente.

---

## Padronização do Código

Na raiz do projeto, você encontrará os seguintes arquivos responsáveis pela padronização do código:

* **.editorconfig**: Define regras básicas de estilo de código, como indentação, espaçamento, e final de linha.
* **.eslint.config.js**: Arquivo de configuração do ESLint, utilizado para garantir a qualidade do código, identificando e corrigindo problemas de estilo e possíveis erros no JavaScript/TypeScript.
* **.prettierrc**: Arquivo de configuração do Prettier, responsável pela formatação automática do código com base em regras predefinidas, garantindo consistência em todo o projeto.

Esses arquivos, em conjunto com as configurações do VSCode, garantem que todos os desenvolvedores sigam as mesmas regras de estilo, evitando divergências no código e assegurando a integridade e legibilidade.

## Fluxo de Commits e Integração Contínua

Este projeto adota uma abordagem rigorosa para garantir a integridade dos commits e a consistência do código ao longo do desenvolvimento.

### Estrutura das Mensagens de Commit

Para garantir que as mensagens de commit sejam claras e sigam um padrão consistente, utilizamos o **Commitlint** para validar a estrutura de cada commit. O formato a ser seguido é o seguinte:

`<tipo>:<descrição breve>`

### Tipos de Commit Permitidos

A mensagem de commit deve começar com um dos seguintes tipos:

* **feat** : Usado para descrever a adição de uma nova funcionalidade.
* **fix** : Indica a correção de um bug.
* **chore** : Refere-se a tarefas que não alteram o código da aplicação (por exemplo, atualizações de dependências).
* **style** : Para mudanças relacionadas à formatação de código (sem alterar o comportamento), como ajustes de espaçamento ou indentação.
* **refactor** : Usado quando há uma refatoração no código sem mudanças em sua funcionalidade.
* **doc** : Refere-se a mudanças na documentação do projeto.
* **wip** : Para algo que ainda esta sendo trabalhado (Work in progress)

### Regras para a Descrição

* **A descrição** deve ser breve e objetiva, escrita em **letras minúsculas** e no  **imperativo** , explicando o que foi feito no commit. Exemplo: `feat: implement user login functionality`
* **Limitação de comprimento** : A linha de descrição não deve ultrapassar 72 caracteres para manter a legibilidade.

### Exemplo de Mensagem de Commit

Aqui estão exemplos de mensagens de commit seguindo o padrão do projeto:

* `feat: add user authentication`
* `fix: correct flow on service`
* `chore: update dependncies`
* `style: fix indentation in service.ts`
* `refactor: improve performance of data fetching`
* `doc: update README with installation instructions`

### Git Hooks e Linting de Commits

O [**Lefthook**](https://github.com/evilmartians/lefthook) está configurado para rodar scripts automaticamente antes dos commits e push. O **Commitlint** valida a estrutura da mensagem de commit, garantindo que todos os desenvolvedores sigam o padrão estabelecido.

---

### Scripts de Pré-push e Build

Antes de realizar um push, o script de **lint** é invocado automaticamente para garantir que o código não contenha erros. Junto a isso, uma validação de tipos também é invocada para garantir que somente código em bom estado seja enviado ao repositório remoto. Além disso, os testes são executados automaticamente para assegurar que nenhuma funcionalidade esteja quebrada antes de o código ser enviado.


---

## Estrutura Arquitetural
Este projeto segue um monólito modularizado com conceitos de Clean Architecture e Domain-Driven Design (DDD). Cada módulo é tratado como um subdomínio independente, favorecendo a modularidade e o desacoplamento.

### Estrutura de Pastas
```plaintext
src
├── common
│   ├── i18n
│   └── validations
├── core
│   ├── application
│   │   ├── gateways
│   │   │   ├── providers
│   │   │   └── repositories
│   ├── domain
│   │   ├── value-objects
│   └── infra
│       ├── gateways
│       │   ├── providers
│       │   └── repositories/prisma/connection
├── modules
│   ├── account
│   │   ├── application
│   │   │   ├── gateways
│   │   │   │   ├── providers
│   │   │   │   └── repositories
│   │   │   └── use-cases
│   │   ├── domain
│   │   │   ├── entities
│   │   │   ├── mappers
│   │   │   │── value-objects
│   │   │   └── services 
│   │   └── infra
│   │       ├── controllers
│   │       ├── gateways
│   │       │   ├── providers
│   │       │   └── repositories/prisma
│   │       └── facade
│   └── account.module.ts
├── app.module.ts
└── main.ts
```

---

### Explicação das Pastas

#### `common`
Contém elementos reutilizáveis e compartilháveis por toda a aplicação:
- **i18n**: JSONs para internacionalização (traduções).
- **validations**: Arquivos para validação genérica, como `env.validation.ts`.

#### `core`
Agrupa partes genéricas e reutilizáveis da aplicação, seguindo a Clean Architecture:
- **application**: Define contratos (gateways) que serão implementados pelas camadas de infraestrutura e consumidos pelos casos de uso.
- **domain**:
  - **value-objects**: Representam conceitos imutáveis e autônomos, como CPF, email, etc.
- **infra**: Implementação de gateways e provedores genéricos, como AWS S3.

#### `modules`
Onde os módulos específicos da aplicação são definidos, cada um representando um subdomínio:
- **application**:
  - **gateways**: Contratos de comunicação externa.
  - **use-cases**: Contêm a lógica de negócios específica do módulo.
- **domain**:
  - **entities**: Representam objetos principais do domínio com regras de negócio autônomas.
  - **mappers**: Realizam a transformação entre modelos de dados (ex.: banco de dados para domínio).
  - **value-objects**: Componentes imutáveis e autônomos do domínio.
  - **services**: Serviços de domínio que encapsulam lógica complexa ou regras que afetam múltiplas entidades.
- **infra**:
  - **controllers**: Pontos de entrada da aplicação.
  - **facade**: Interface simplificada para comunicação entre módulos.
  - **gateways**: Implementações de contratos definidos na camada de aplicação.

---

## Conceitos Fundamentais

### Monólito Modularizado
Um **monólito modularizado** é uma abordagem arquitetural que organiza a aplicação em módulos independentes dentro de um único código base. Ele combina as vantagens de um sistema monolítico com práticas de modularização, promovendo uma melhor organização e separação de responsabilidades.

#### Benefícios:
- **Manutenibilidade**: Alterações em um módulo podem ser realizadas sem impacto nos demais, graças à separação clara de responsabilidades.
- **Escalabilidade Organizacional**: Equipes podem trabalhar em módulos diferentes de maneira isolada, reduzindo conflitos e aumentando a produtividade.
- **Reutilização**: Módulos bem projetados podem ser reaproveitados em outros projetos ou contextos.
- **Performance Simplificada**: Como a aplicação é executada em um único processo, evita-se a complexidade associada à comunicação entre microserviços.
  

### Domain-Driven Design (DDD)
O **Domain-Driven Design (DDD)** é uma abordagem para projetar software que se concentra na modelagem de domínios complexos. Ele prioriza a compreensão e representação precisa do negócio no código.

#### Principais Elementos:
- **Entities**: Representam objetos do domínio que possuem uma identidade única. Além disso, encapsulam as regras de negócio específicas da entidade. Por exemplo, em um sistema bancário, uma "Conta Bancária" seria uma entidade com métodos para "depositar" ou "sacar".
- **Value Objects**: São objetos imutáveis que representam um conceito ou atributo, mas não possuem identidade própria. Exemplos incluem "Endereço" ou "CPF".
- **Domain Services**: Contêm regras de negócio que não pertencem a uma única entidade ou valor. Eles ajudam a organizar a lógica de alto nível no domínio. Por exemplo, um serviço para "Transferência de Fundos" pode envolver múltiplas contas bancárias.

DDD também enfatiza:
- **Comunicação**: Usar uma linguagem ubíqua (ubiquitous language) compartilhada entre times técnicos e de negócio.
- **Modelagem Estruturada**: Criar subdomínios que reflitam diferentes áreas do negócio.


### Padrão de Facade
O **padrão de facade** é um padrão estrutural que fornece uma interface simplificada para subsistemas complexos, garantindo que a comunicação entre módulos seja desacoplada e bem organizada.

#### Características:
- **Desacoplamento**: Os módulos não se comunicam diretamente; em vez disso, utilizam a facade para expor métodos específicos.
- **Organização**: Simplifica a estrutura do código, escondendo complexidades internas dos subsistemas.
- **Flexibilidade**: Permite alterar a implementação interna dos módulos sem impactar os demais.


### Repository Pattern
O **repository pattern** é um padrão que abstrai a interação com a camada de dados, permitindo que a lógica de domínio se mantenha isolada dos detalhes da infraestrutura (como bancos de dados ou APIs externas).

#### Benefícios:
- **Desacoplamento**: O domínio não precisa conhecer detalhes sobre como os dados são armazenados ou recuperados.
- **Testabilidade**: Como os repositórios são interfaces, eles podem ser facilmente simulados (mockados) em testes.
- **Reutilização**: Repositórios bem projetados podem ser usados em diferentes partes do sistema sem duplicação de código.

---

## Cultura de TDD
Todos os casos de uso, facades, entidades e serviços de domínio devem ser testados. Os testes e2e são importantes, mas os testes unitários são prioritários para garantir a qualidade das regras de negócio.

- **Pasta de testes**: `src/test` para testes e2e.
- **Execução de testes**: Use `pnpm test` para rodar os testes.

---

## Links Úteis
- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/)
- [Modular Monolith](https://ardalis.com/introducing-modular-monoliths-goldilocks-architecture/)
- [Monolith First](https://martinfowler.com/bliki/MonolithFirst.html)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Artigo sobre DDD](https://softengbook.org/articles/ddd)
- [Repository Pattern](https://martinfowler.com/eaaCatalog/repository.html)
- [Facade Pattern](https://refactoring.guru/design-patterns/facade)

