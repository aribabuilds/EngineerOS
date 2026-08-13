/** Small chips joined by arrows: the one piece of literal technical proof in
 * the section, kept small and quiet inside the Decision row. Server-rendered,
 * no motion of its own. */
export default function MicroFlow({ flows }: { flows: string[][] }) {
  return (
    <>
      {flows.map((chips, i) => (
        <div key={i} className="shipped-forest__flow">
          {chips.map((chip, j) => (
            <span key={j} className="flex items-center gap-[0.3rem]">
              {j > 0 ? <span className="shipped-forest__flow-arrow" aria-hidden="true">&rarr;</span> : null}
              <span className="shipped-forest__chip">{chip}</span>
            </span>
          ))}
        </div>
      ))}
    </>
  );
}
