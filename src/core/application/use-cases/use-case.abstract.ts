export default abstract class AbstractUseCase {
  abstract execute(input: any): Promise<any>;
}
