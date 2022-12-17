import ctl from "@netlify/classnames-template-literals";

export function GameSquare({ children, onClick }) {
  const classNames = ctl(`flex
    justify-center
    items-center
    m-2
    bg-white
    text-3xl
    w-28
    h-28
    outline
    rounded
    btn-square
    outline-amber-900
    hover:outline-amber-900
    hover:outline-8`);
  return (
    <button className={classNames} onClick={onClick}>
      {children}
    </button>
  );
}
