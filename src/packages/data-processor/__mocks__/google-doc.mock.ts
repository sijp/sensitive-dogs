export default {
  title: "test",
  body: {
    content: [
      {
        endIndex: 1,
        sectionBreak: {
          sectionStyle: {
            columnSeparatorStyle: "NONE",
            contentDirection: "LEFT_TO_RIGHT",
            sectionType: "CONTINUOUS"
          }
        }
      },
      {
        startIndex: 1,
        endIndex: 8,
        paragraph: {
          elements: [
            {
              startIndex: 1,
              endIndex: 8,
              textRun: { content: "Title 1\n", textStyle: {} }
            }
          ],
          paragraphStyle: {
            namedStyleType: "NORMAL_TEXT",
            direction: "LEFT_TO_RIGHT"
          }
        }
      },
      {
        startIndex: 8,
        endIndex: 16,
        paragraph: {
          elements: [
            {
              startIndex: 8,
              endIndex: 16,
              textRun: { content: "Title 2\n", textStyle: {} }
            }
          ],
          paragraphStyle: {
            namedStyleType: "NORMAL_TEXT",
            direction: "LEFT_TO_RIGHT"
          }
        }
      },
      {
        startIndex: 16,
        endIndex: 24,
        paragraph: {
          elements: [
            {
              startIndex: 16,
              endIndex: 24,
              textRun: { content: "Title 3\n", textStyle: {} }
            }
          ],
          paragraphStyle: {
            namedStyleType: "NORMAL_TEXT",
            direction: "LEFT_TO_RIGHT"
          }
        }
      },
      {
        startIndex: 24,
        endIndex: 32,
        paragraph: {
          elements: [
            {
              startIndex: 24,
              endIndex: 32,
              textRun: { content: "Title 4\n", textStyle: {} }
            }
          ],
          paragraphStyle: {
            namedStyleType: "NORMAL_TEXT",
            direction: "LEFT_TO_RIGHT"
          }
        }
      },
      {
        startIndex: 32,
        endIndex: 40,
        paragraph: {
          elements: [
            {
              startIndex: 32,
              endIndex: 40,
              textRun: { content: "Title 5\n", textStyle: {} }
            }
          ],
          paragraphStyle: {
            namedStyleType: "NORMAL_TEXT",
            direction: "LEFT_TO_RIGHT"
          }
        }
      },
      {
        startIndex: 40,
        endIndex: 57,
        paragraph: {
          elements: [
            {
              startIndex: 40,
              endIndex: 57,
              textRun: { content: "Normal Paragraph\n", textStyle: {} }
            }
          ],
          paragraphStyle: {
            namedStyleType: "NORMAL_TEXT",
            direction: "LEFT_TO_RIGHT"
          }
        }
      },
      {
        startIndex: 57,
        endIndex: 58,
        paragraph: {
          elements: [
            {
              startIndex: 57,
              endIndex: 58,
              textRun: { content: "\n", textStyle: {} }
            }
          ],
          paragraphStyle: {
            namedStyleType: "NORMAL_TEXT",
            direction: "LEFT_TO_RIGHT"
          }
        }
      },
      {
        startIndex: 58,
        endIndex: 121,
        paragraph: {
          elements: [
            {
              startIndex: 58,
              endIndex: 75,
              textRun: { content: "A Paragraph with ", textStyle: {} }
            },
            {
              startIndex: 75,
              endIndex: 79,
              textRun: { content: "bold", textStyle: { bold: true } }
            },
            {
              startIndex: 79,
              endIndex: 81,
              textRun: { content: ", ", textStyle: {} }
            },
            {
              startIndex: 81,
              endIndex: 87,
              textRun: {
                content: "italic",
                textStyle: { italic: true }
              }
            },
            {
              startIndex: 87,
              endIndex: 92,
              textRun: { content: " and ", textStyle: {} }
            },
            {
              startIndex: 92,
              endIndex: 101,
              textRun: {
                content: "underline",
                textStyle: { underline: true }
              }
            },
            {
              startIndex: 101,
              endIndex: 111,
              textRun: { content: ". And all ", textStyle: {} }
            },
            {
              startIndex: 111,
              endIndex: 119,
              textRun: {
                content: "together",
                textStyle: {
                  bold: true,
                  italic: true,
                  underline: true
                }
              }
            },
            {
              startIndex: 119,
              endIndex: 121,
              textRun: { content: ".\n", textStyle: {} }
            }
          ],
          paragraphStyle: {
            namedStyleType: "NORMAL_TEXT",
            direction: "LEFT_TO_RIGHT"
          }
        }
      },
      {
        startIndex: 121,
        endIndex: 122,
        paragraph: {
          elements: [
            {
              startIndex: 121,
              endIndex: 122,
              textRun: { content: "\n", textStyle: {} }
            }
          ],
          paragraphStyle: {
            namedStyleType: "NORMAL_TEXT",
            direction: "LEFT_TO_RIGHT"
          }
        }
      },
      {
        startIndex: 122,
        endIndex: 124,
        paragraph: {
          elements: [
            {
              startIndex: 122,
              endIndex: 123,
              inlineObjectElement: {
                inlineObjectId: "kix.abcdefg",
                textStyle: {}
              }
            },
            {
              startIndex: 123,
              endIndex: 124,
              textRun: { content: "\n", textStyle: {} }
            }
          ],
          paragraphStyle: {
            namedStyleType: "NORMAL_TEXT",
            direction: "LEFT_TO_RIGHT"
          }
        }
      },
      {
        startIndex: 124,
        endIndex: 125,
        paragraph: {
          elements: [
            {
              startIndex: 124,
              endIndex: 125,
              textRun: { content: "\n", textStyle: {} }
            }
          ],
          paragraphStyle: {
            namedStyleType: "NORMAL_TEXT",
            direction: "LEFT_TO_RIGHT"
          }
        }
      },
      {
        startIndex: 125,
        endIndex: 142,
        paragraph: {
          elements: [
            {
              startIndex: 125,
              endIndex: 142,
              textRun: { content: "Ordered Bullets:\n", textStyle: {} }
            }
          ],
          paragraphStyle: {
            namedStyleType: "NORMAL_TEXT",
            direction: "LEFT_TO_RIGHT"
          }
        }
      },
      {
        startIndex: 142,
        endIndex: 146,
        paragraph: {
          elements: [
            {
              startIndex: 142,
              endIndex: 146,
              textRun: { content: "One\n", textStyle: {} }
            }
          ],
          paragraphStyle: {
            namedStyleType: "NORMAL_TEXT",
            direction: "LEFT_TO_RIGHT",
            indentFirstLine: { magnitude: 18, unit: "PT" },
            indentStart: { magnitude: 36, unit: "PT" }
          },
          bullet: {
            listId: "kix.aaaaaaaaaa",
            textStyle: { underline: false }
          }
        }
      },
      {
        startIndex: 146,
        endIndex: 150,
        paragraph: {
          elements: [
            {
              startIndex: 146,
              endIndex: 150,
              textRun: { content: "Two\n", textStyle: {} }
            }
          ],
          paragraphStyle: {
            namedStyleType: "NORMAL_TEXT",
            direction: "LEFT_TO_RIGHT",
            indentFirstLine: { magnitude: 18, unit: "PT" },
            indentStart: { magnitude: 36, unit: "PT" }
          },
          bullet: {
            listId: "kix.aaaaaaaaaa",
            textStyle: { underline: false }
          }
        }
      },
      {
        startIndex: 150,
        endIndex: 156,
        paragraph: {
          elements: [
            {
              startIndex: 150,
              endIndex: 156,
              textRun: { content: "Three\n", textStyle: {} }
            }
          ],
          paragraphStyle: {
            namedStyleType: "NORMAL_TEXT",
            direction: "LEFT_TO_RIGHT",
            indentFirstLine: { magnitude: 18, unit: "PT" },
            indentStart: { magnitude: 36, unit: "PT" }
          },
          bullet: {
            listId: "kix.aaaaaaaaaa",
            textStyle: { underline: false }
          }
        }
      },
      {
        startIndex: 156,
        endIndex: 157,
        paragraph: {
          elements: [
            {
              startIndex: 156,
              endIndex: 157,
              textRun: { content: "\n", textStyle: {} }
            }
          ],
          paragraphStyle: {
            namedStyleType: "NORMAL_TEXT",
            direction: "LEFT_TO_RIGHT"
          }
        }
      },
      {
        startIndex: 157,
        endIndex: 176,
        paragraph: {
          elements: [
            {
              startIndex: 157,
              endIndex: 176,
              textRun: {
                content: "Unordered Bullets:\n",
                textStyle: {}
              }
            }
          ],
          paragraphStyle: {
            namedStyleType: "NORMAL_TEXT",
            direction: "LEFT_TO_RIGHT"
          }
        }
      },
      {
        startIndex: 176,
        endIndex: 182,
        paragraph: {
          elements: [
            {
              startIndex: 176,
              endIndex: 182,
              textRun: { content: "First\n", textStyle: {} }
            }
          ],
          paragraphStyle: {
            namedStyleType: "NORMAL_TEXT",
            direction: "LEFT_TO_RIGHT",
            indentFirstLine: { magnitude: 18, unit: "PT" },
            indentStart: { magnitude: 36, unit: "PT" }
          },
          bullet: {
            listId: "kix.bbbbbbbbb",
            textStyle: { underline: false }
          }
        }
      },
      {
        startIndex: 182,
        endIndex: 189,
        paragraph: {
          elements: [
            {
              startIndex: 182,
              endIndex: 189,
              textRun: { content: "Second\n", textStyle: {} }
            }
          ],
          paragraphStyle: {
            namedStyleType: "NORMAL_TEXT",
            direction: "LEFT_TO_RIGHT",
            indentFirstLine: { magnitude: 18, unit: "PT" },
            indentStart: { magnitude: 36, unit: "PT" }
          },
          bullet: {
            listId: "kix.bbbbbbbbb",
            textStyle: { underline: false }
          }
        }
      },
      {
        startIndex: 189,
        endIndex: 195,
        paragraph: {
          elements: [
            {
              startIndex: 189,
              endIndex: 195,
              textRun: { content: "Third\n", textStyle: {} }
            }
          ],
          paragraphStyle: {
            namedStyleType: "NORMAL_TEXT",
            direction: "LEFT_TO_RIGHT",
            indentFirstLine: { magnitude: 18, unit: "PT" },
            indentStart: { magnitude: 36, unit: "PT" }
          },
          bullet: {
            listId: "kix.bbbbbbbbb",
            textStyle: { underline: false }
          }
        }
      },
      {
        startIndex: 195,
        endIndex: 196,
        paragraph: {
          elements: [
            {
              startIndex: 195,
              endIndex: 196,
              textRun: { content: "\n", textStyle: {} }
            }
          ],
          paragraphStyle: {
            namedStyleType: "NORMAL_TEXT",
            direction: "LEFT_TO_RIGHT"
          }
        }
      },
      {
        startIndex: 196,
        endIndex: 197,
        paragraph: {
          elements: [
            {
              startIndex: 196,
              endIndex: 197,
              textRun: { content: "\n", textStyle: {} }
            }
          ],
          paragraphStyle: {
            namedStyleType: "NORMAL_TEXT",
            direction: "LEFT_TO_RIGHT"
          }
        }
      },
      {
        startIndex: 197,
        endIndex: 198,
        paragraph: {
          elements: [
            {
              startIndex: 197,
              endIndex: 198,
              textRun: { content: "\n", textStyle: {} }
            }
          ],
          paragraphStyle: {
            namedStyleType: "NORMAL_TEXT",
            direction: "LEFT_TO_RIGHT"
          }
        }
      },
      {
        startIndex: 198,
        endIndex: 575,
        paragraph: {
          elements: [
            {
              startIndex: 198,
              endIndex: 575,
              textRun: {
                content:
                  "This is a long paragraph with a floating image This is a long paragraph with a floating image This is a long paragraph with a floating image This is a long paragraph with a floating image This is a long paragraph with a floating image This is a long paragraph with a floating image This is a long paragraph with a floating image This is a long paragraph with a floating image.\n",
                textStyle: {}
              }
            }
          ],
          paragraphStyle: {
            namedStyleType: "NORMAL_TEXT",
            direction: "LEFT_TO_RIGHT"
          },
          positionedObjectIds: ["kix.1234567890"]
        }
      },
      {
        startIndex: 575,
        endIndex: 619,
        paragraph: {
          elements: [
            {
              startIndex: 3477,
              endIndex: 3520,
              textRun: {
                content: "https://www.youtube.com/watch?v=12345678901",
                textStyle: {
                  underline: true,
                  foregroundColor: {
                    color: {
                      rgbColor: {
                        red: 0.06666667,
                        green: 0.33333334,
                        blue: 0.8
                      }
                    }
                  },
                  link: {
                    url: "https://www.youtube.com/watch?v=IOhpr3NO3TY&fbclid=IwAR3q0bN6kbKyMOQZbGnKTXBxsw56c6xe1yWA_fr5jSpfom-bcSrrqFYWudw"
                  }
                }
              }
            },
            {
              startIndex: 3520,
              endIndex: 3521,
              textRun: {
                content: "\n",
                textStyle: {}
              }
            }
          ],
          paragraphStyle: {
            namedStyleType: "NORMAL_TEXT",
            direction: "LEFT_TO_RIGHT",
            pageBreakBefore: false
          }
        }
      }
    ]
  },
  documentStyle: {
    background: { color: {} },
    pageNumberStart: 1,
    marginTop: { magnitude: 72, unit: "PT" },
    marginBottom: { magnitude: 72, unit: "PT" },
    marginRight: { magnitude: 72, unit: "PT" },
    marginLeft: { magnitude: 72, unit: "PT" },
    pageSize: {
      height: { magnitude: 792, unit: "PT" },
      width: { magnitude: 612, unit: "PT" }
    },
    marginHeader: { magnitude: 36, unit: "PT" },
    marginFooter: { magnitude: 36, unit: "PT" },
    useCustomHeaderFooterMargins: true
  },
  lists: {
    "kix.bbbbbbbbb": {
      listProperties: {
        nestingLevels: [
          {
            bulletAlignment: "START",
            glyphSymbol: "●",
            glyphFormat: "%0",
            indentFirstLine: { magnitude: 18, unit: "PT" },
            indentStart: { magnitude: 36, unit: "PT" },
            textStyle: { underline: false },
            startNumber: 1
          },
          {
            bulletAlignment: "START",
            glyphSymbol: "○",
            glyphFormat: "%1",
            indentFirstLine: { magnitude: 54, unit: "PT" },
            indentStart: { magnitude: 72, unit: "PT" },
            textStyle: { underline: false },
            startNumber: 1
          },
          {
            bulletAlignment: "START",
            glyphSymbol: "■",
            glyphFormat: "%2",
            indentFirstLine: { magnitude: 90, unit: "PT" },
            indentStart: { magnitude: 108, unit: "PT" },
            textStyle: { underline: false },
            startNumber: 1
          },
          {
            bulletAlignment: "START",
            glyphSymbol: "●",
            glyphFormat: "%3",
            indentFirstLine: { magnitude: 126, unit: "PT" },
            indentStart: { magnitude: 144, unit: "PT" },
            textStyle: { underline: false },
            startNumber: 1
          },
          {
            bulletAlignment: "START",
            glyphSymbol: "○",
            glyphFormat: "%4",
            indentFirstLine: { magnitude: 162, unit: "PT" },
            indentStart: { magnitude: 180, unit: "PT" },
            textStyle: { underline: false },
            startNumber: 1
          },
          {
            bulletAlignment: "START",
            glyphSymbol: "■",
            glyphFormat: "%5",
            indentFirstLine: { magnitude: 198, unit: "PT" },
            indentStart: { magnitude: 216, unit: "PT" },
            textStyle: { underline: false },
            startNumber: 1
          },
          {
            bulletAlignment: "START",
            glyphSymbol: "●",
            glyphFormat: "%6",
            indentFirstLine: { magnitude: 234, unit: "PT" },
            indentStart: { magnitude: 252, unit: "PT" },
            textStyle: { underline: false },
            startNumber: 1
          },
          {
            bulletAlignment: "START",
            glyphSymbol: "○",
            glyphFormat: "%7",
            indentFirstLine: { magnitude: 270, unit: "PT" },
            indentStart: { magnitude: 288, unit: "PT" },
            textStyle: { underline: false },
            startNumber: 1
          },
          {
            bulletAlignment: "START",
            glyphSymbol: "■",
            glyphFormat: "%8",
            indentFirstLine: { magnitude: 306, unit: "PT" },
            indentStart: { magnitude: 324, unit: "PT" },
            textStyle: { underline: false },
            startNumber: 1
          }
        ]
      }
    },
    "kix.aaaaaaaaaa": {
      listProperties: {
        nestingLevels: [
          {
            bulletAlignment: "START",
            glyphType: "DECIMAL",
            glyphFormat: "%0.",
            indentFirstLine: { magnitude: 18, unit: "PT" },
            indentStart: { magnitude: 36, unit: "PT" },
            textStyle: { underline: false },
            startNumber: 1
          },
          {
            bulletAlignment: "START",
            glyphType: "ALPHA",
            glyphFormat: "%1.",
            indentFirstLine: { magnitude: 54, unit: "PT" },
            indentStart: { magnitude: 72, unit: "PT" },
            textStyle: { underline: false },
            startNumber: 1
          },
          {
            bulletAlignment: "END",
            glyphType: "ROMAN",
            glyphFormat: "%2.",
            indentFirstLine: { magnitude: 90, unit: "PT" },
            indentStart: { magnitude: 108, unit: "PT" },
            textStyle: { underline: false },
            startNumber: 1
          },
          {
            bulletAlignment: "START",
            glyphType: "DECIMAL",
            glyphFormat: "%3.",
            indentFirstLine: { magnitude: 126, unit: "PT" },
            indentStart: { magnitude: 144, unit: "PT" },
            textStyle: { underline: false },
            startNumber: 1
          },
          {
            bulletAlignment: "START",
            glyphType: "ALPHA",
            glyphFormat: "%4.",
            indentFirstLine: { magnitude: 162, unit: "PT" },
            indentStart: { magnitude: 180, unit: "PT" },
            textStyle: { underline: false },
            startNumber: 1
          },
          {
            bulletAlignment: "END",
            glyphType: "ROMAN",
            glyphFormat: "%5.",
            indentFirstLine: { magnitude: 198, unit: "PT" },
            indentStart: { magnitude: 216, unit: "PT" },
            textStyle: { underline: false },
            startNumber: 1
          },
          {
            bulletAlignment: "START",
            glyphType: "DECIMAL",
            glyphFormat: "%6.",
            indentFirstLine: { magnitude: 234, unit: "PT" },
            indentStart: { magnitude: 252, unit: "PT" },
            textStyle: { underline: false },
            startNumber: 1
          },
          {
            bulletAlignment: "START",
            glyphType: "ALPHA",
            glyphFormat: "%7.",
            indentFirstLine: { magnitude: 270, unit: "PT" },
            indentStart: { magnitude: 288, unit: "PT" },
            textStyle: { underline: false },
            startNumber: 1
          },
          {
            bulletAlignment: "END",
            glyphType: "ROMAN",
            glyphFormat: "%8.",
            indentFirstLine: { magnitude: 306, unit: "PT" },
            indentStart: { magnitude: 324, unit: "PT" },
            textStyle: { underline: false },
            startNumber: 1
          }
        ]
      }
    }
  },
  revisionId:
    "ABFxVSlVC73INFCxFujimkQWOVpsfI1exf2QpzLnHWYaeuRzWT90Sq_BeKzCDI5XccXvp4qLO_WprwV3szngrw",
  suggestionsViewMode: "SUGGESTIONS_INLINE",
  inlineObjects: {
    "kix.abcdefg": {
      objectId: "kix.abcdefg",
      inlineObjectProperties: {
        embeddedObject: {
          imageProperties: {
            contentUri: "https://xxx",
            cropProperties: {}
          },
          embeddedObjectBorder: {
            color: { color: { rgbColor: {} } },
            width: { unit: "PT" },
            dashStyle: "SOLID",
            propertyState: "NOT_RENDERED"
          },
          size: {
            height: { magnitude: 263, unit: "PT" },
            width: { magnitude: 468, unit: "PT" }
          },
          marginTop: { magnitude: 9, unit: "PT" },
          marginBottom: { magnitude: 9, unit: "PT" },
          marginRight: { magnitude: 9, unit: "PT" },
          marginLeft: { magnitude: 9, unit: "PT" }
        }
      }
    }
  },
  positionedObjects: {
    "kix.1234567890": {
      objectId: "kix.1234567890",
      positionedObjectProperties: {
        positioning: {
          layout: "WRAP_TEXT",
          leftOffset: { magnitude: -7.5, unit: "PT" },
          topOffset: { unit: "PT" }
        },
        embeddedObject: {
          imageProperties: {
            contentUri: "https://xxx",
            cropProperties: {}
          },
          embeddedObjectBorder: {
            color: { color: { rgbColor: {} } },
            width: { unit: "PT" },
            dashStyle: "SOLID",
            propertyState: "NOT_RENDERED"
          },
          size: {
            height: { magnitude: 336.375, unit: "PT" },
            width: { magnitude: 189.26780883678992, unit: "PT" }
          },
          marginTop: { magnitude: 9, unit: "PT" },
          marginBottom: { magnitude: 9, unit: "PT" },
          marginRight: { magnitude: 9, unit: "PT" },
          marginLeft: { magnitude: 9, unit: "PT" }
        }
      }
    }
  },
  documentId: "1234567890abcdefghijklmnopqrstuvwxyz"
};
