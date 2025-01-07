import Dependencies
import Html

extension Node.BA {
  public static func Dialog(
    id _id: String?,
    trigger: Node,
    popup: Node
  ) async -> Node {
    @Dependency(\.uuid) var uuid
    @Dependency(\.baunilha) var baunilha
    let id = _id ?? uuid().uuidString
    await baunilha.addImports(scripts: [.dialog])
    return .fragment([
      trigger.appending(attributes: [
        ("aria-haspopup", "dialog"),
        ("aria-expanded", "false"),
        ("aria-controls", id),
      ]),
      popup.appending(attributes: [
        ("id", id),
        ("role", "dialog"),
        ("aria-modal", "true"),
      ])
    ])
  }
}
