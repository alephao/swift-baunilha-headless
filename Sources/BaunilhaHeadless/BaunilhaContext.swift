import Dependencies
import Html

#if canImport(FoundationNetworking)
  import FoundationNetworking
#endif

public enum BaunilhaError: Error {
  case fileNotFound
}

public actor BaunilhaContext {
  var _scripts: Set<BaunilhaScript> = .init()

  public func scripts(basePath: String) -> Node {
    let _basePath = basePath.hasSuffix("/")
      ? basePath
      : basePath + "/"
    return .fragment(
      self._scripts.map({ s in
        Node.script(attributes: [.src(_basePath + s.fileName), .defer(true)])
      })
    )
  }

  public init() {}

  func addImports(scripts: [BaunilhaScript] = []) {
    for sc in scripts {
      self._scripts.insert(sc)
    }
  }
}

extension BaunilhaContext: DependencyKey {
  public static var liveValue: BaunilhaContext = .init()
  public static var testValue: BaunilhaContext = .init()
}

extension DependencyValues {
  public var baunilha: BaunilhaContext {
    get { self[BaunilhaContext.self] }
    set { self[BaunilhaContext.self] = newValue }
  }
}
