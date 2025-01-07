import Dependencies
import SnapshotTesting
import XCTest

@testable import BaunilhaHeadless

final class DialogTests: XCTestCase {
  func testDialog() {
    let dialog = Dialog(
      id: "DIALOGID",
      class: "DIALOGCLASS",
      attributes: [.ariaLabel("CUSTOM ATTRIBUTE")],
      trigger: .button(.text("DIALOG TRIGGER")),
      popup: .div(.p("THE POPUP"))
    )
    let dialogTriggerNode = dialog.node

    @Dependency(\.baunilha) var baunilha
    XCTAssertEqual(baunilha.scripts, [.core, .dialog])
    XCTAssertEqual(baunilha.styles, [.animation])
    XCTAssertEqual(baunilha.dialogs.count, 1)

    let dialogNode = baunilha.dialogs["DIALOGID"]!
    let container = Node.div(
      dialogTriggerNode,
      dialogNode
    )
    assertSnapshot(of: container, as: .html)
  }
}
