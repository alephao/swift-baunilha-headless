import Foundation

#if canImport(FoundationNetworking)
  import FoundationNetworking
#endif

public enum BaunilhaScript: Sendable, CaseIterable, Hashable {
  case dialog
  case flyout

  public static func from(fileName: String) throws(BaunilhaError) -> Self {
    switch fileName {
    case "\(_dialogFileName).js": return .dialog
    case "\(_flyoutFileName).js": return .flyout
    default:
      throw BaunilhaError.fileNotFound
    }
  }

  public var fileName: String {
    switch self {
    case .dialog: return "\(_dialogFileName).js"
    case .flyout: return "\(_flyoutFileName).js"
    }
  }

  public var url: URL {
    Bundle.module.url(forResource: resourceName, withExtension: "js")!
  }

  public var resourceName: String {
    switch self {
    case .dialog: return _dialogFileName
    case .flyout: return _flyoutFileName
    }
  }

  public func getData() throws -> Data {
    try Data(contentsOf: url)
  }
}
