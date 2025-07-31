export abstract class AbstractUseCase<Input, Response> {
  abstract execute(input: Input): Promise<Response>;
}
