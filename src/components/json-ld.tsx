interface JsonLdProps {
  /** A schema.org graph, built by one of the helpers in `@/lib/json-ld`. */
  data: unknown;
  /** Distinguishes the script when a route emits more than one graph. */
  id?: string;
}

/**
 * Emits a schema.org graph as `application/ld+json`.
 *
 * Payloads are built from `DATA` at render time, so structured data can never
 * drift from what is actually on the page.
 */
export function JsonLd({ data, id }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // Serialised on the server from trusted local data, never user input.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
