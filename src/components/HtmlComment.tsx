/**
 * Emits a literal HTML comment into the rendered page source. Ordinary JSX
 * comments are stripped at compile time and never reach the DOM, so this
 * exists for cases where the comment itself needs to be visible via view-source
 * (owner-facing flags, verification markers). The text is always a hardcoded
 * literal from our own source, never user input.
 */
export default function HtmlComment({ text }: { text: string }) {
  return <span dangerouslySetInnerHTML={{ __html: `<!-- ${text} -->` }} />;
}
