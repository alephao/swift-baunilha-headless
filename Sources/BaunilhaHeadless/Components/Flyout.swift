import Dependencies
import Html

extension Node.BA {
  public static func Flyout(
    id _id: String?,
    trigger: Node,
    popup: Node
  ) async -> Node {
    @Dependency(\.uuid) var uuid
    @Dependency(\.baunilha) var baunilha
    let id = _id ?? uuid().uuidString
    await baunilha.addImports(scripts: [.flyout])
    return .fragment([
      trigger.appending(attributes: [
        ("aria-haspopup", "menu"),
        ("aria-expanded", "false"),
        ("aria-controls", id),
      ]),
      popup.appending(attributes: [
        ("id", id),
        ("role", "menu"),
      ]),
    ])
  }
}
