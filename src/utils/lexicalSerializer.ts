// Lexical Editor JSON to HTML serializer
// Converts Payload CMS's Lexical editor format to HTML string

interface LexicalNode {
  type: string
  version: number
  [key: string]: unknown
}

interface LexicalTextNode extends LexicalNode {
  type: 'text'
  text: string
  format?: number
  style?: string
  mode?: string
  detail?: number
}

interface LexicalElementNode extends LexicalNode {
  type: string
  children?: LexicalNode[]
  format?: string | number
  indent?: number
  direction?: string
  tag?: string
  url?: string
  rel?: string
  target?: string
  title?: string
}

interface LexicalEditorState {
  root: LexicalElementNode
}

/**
 * Converts Lexical editor JSON to HTML string
 * Handles basic formatting, links, lists, headings, etc.
 */
export function lexicalToHtml(lexicalJson: LexicalEditorState | null | undefined): string {
  if (!lexicalJson || !lexicalJson.root) {
    return ''
  }

  return serializeNode(lexicalJson.root)
}

/**
 * Converts Lexical editor JSON to plain text (strips all formatting)
 */
export function lexicalToPlainText(lexicalJson: LexicalEditorState | null | undefined): string {
  if (!lexicalJson || !lexicalJson.root) {
    return ''
  }

  const html = serializeNode(lexicalJson.root)
  // Strip HTML tags
  return html.replace(/<[^>]*>/g, '').trim()
}

/**
 * Recursively serialize a Lexical node to HTML
 */
function serializeNode(node: LexicalNode): string {
  if (!node) return ''

  // Text node
  if (node.type === 'text') {
    return serializeTextNode(node as LexicalTextNode)
  }

  // Element node with children
  const elementNode = node as LexicalElementNode

  if (!elementNode.children || elementNode.children.length === 0) {
    return ''
  }

  const childrenHtml = elementNode.children.map((child) => serializeNode(child)).join('')

  // Wrap in appropriate HTML tag based on node type
  switch (elementNode.type) {
    case 'root':
      return childrenHtml

    case 'paragraph':
      return `<p>${childrenHtml}</p>`

    case 'heading': {
      const tag = (elementNode.tag as string) || 'h1'
      return `<${tag}>${childrenHtml}</${tag}>`
    }

    case 'list': {
      const listTag = elementNode.tag === 'ol' ? 'ol' : 'ul'
      return `<${listTag}>${childrenHtml}</${listTag}>`
    }

    case 'listitem':
      return `<li>${childrenHtml}</li>`

    case 'link': {
      const url = (elementNode.url as string) || '#'
      const rel = elementNode.rel ? ` rel="${elementNode.rel}"` : ''
      const target = elementNode.target ? ` target="${elementNode.target}"` : ''
      const title = elementNode.title ? ` title="${elementNode.title}"` : ''
      return `<a href="${url}"${rel}${target}${title}>${childrenHtml}</a>`
    }

    case 'quote':
      return `<blockquote>${childrenHtml}</blockquote>`

    case 'code':
      return `<code>${childrenHtml}</code>`

    case 'linebreak':
      return '<br>'

    default:
      // Unknown node type, just return children
      return childrenHtml
  }
}

/**
 * Serialize a text node with formatting
 */
function serializeTextNode(node: LexicalTextNode): string {
  let text = node.text || ''
  const format = node.format || 0

  // Escape HTML entities
  text = escapeHtml(text)

  // Apply text formatting based on format flags
  // Format is a bitmask: 1=bold, 2=italic, 4=strikethrough, 8=underline, etc.
  if (format & 1) {
    // Bold
    text = `<strong>${text}</strong>`
  }
  if (format & 2) {
    // Italic
    text = `<em>${text}</em>`
  }
  if (format & 4) {
    // Strikethrough
    text = `<s>${text}</s>`
  }
  if (format & 8) {
    // Underline
    text = `<u>${text}</u>`
  }
  if (format & 16) {
    // Code
    text = `<code>${text}</code>`
  }

  return text
}

/**
 * Escape HTML entities
 */
function escapeHtml(text: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }

  return text.replace(/[&<>"']/g, (char) => htmlEscapes[char] || char)
}

/**
 * Type guard to check if value is a Lexical editor state
 */
export function isLexicalEditorState(value: unknown): value is LexicalEditorState {
  if (!value || typeof value !== 'object') return false

  const obj = value as Record<string, unknown>
  return (
    'root' in obj &&
    obj.root !== null &&
    typeof obj.root === 'object' &&
    'type' in (obj.root as object)
  )
}

/**
 * Safely extract text content from either string or Lexical JSON
 * Useful for handling fields that might be either format
 */
export function extractTextContent(
  content: string | LexicalEditorState | null | undefined
): string {
  if (!content) return ''

  if (typeof content === 'string') {
    return content
  }

  if (isLexicalEditorState(content)) {
    return lexicalToPlainText(content)
  }

  return ''
}

/**
 * Safely extract HTML content from either string or Lexical JSON
 * Useful for handling fields that might be either format
 */
export function extractHtmlContent(
  content: string | LexicalEditorState | null | undefined
): string {
  if (!content) return ''

  if (typeof content === 'string') {
    // If it's already HTML or plain text, return as-is
    return content
  }

  if (isLexicalEditorState(content)) {
    return lexicalToHtml(content)
  }

  return ''
}
