import Dependencies
import Html

public func withBaunilhaContext(_ buildNode: (BaunilhaContext) async -> Node) async -> Node {
  @Dependency(\.baunilha) var baunilha
  return await buildNode(baunilha)
}
