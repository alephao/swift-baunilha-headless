import Html

extension Node {
  func appending(
    attributes: [(key: String, value: String?)],
    fallback: Node? = nil
  ) -> Node {
    switch self {
    case .element(let tag, let attrs, let node):
      return .element(
        tag,
        attrs + attributes,
        node
      )
    default:
      if let fallback { return fallback }
      fatalError("called Node.appending(attributes:) on a non element node")
    }
  }
}
