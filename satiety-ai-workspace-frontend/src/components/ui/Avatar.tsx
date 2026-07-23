interface AvatarProps {
  name: string;
  type?: "user" | "assistant";
  size?: "sm" | "md";
}

function Avatar({
  name,
  type = "user",
  size = "sm",
}: AvatarProps) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const sizeClasses =
    size === "sm"
      ? "h-9 w-9 text-sm"
      : "h-11 w-11 text-base";

  const baseClasses = `
    ${sizeClasses}
    flex
    items-center
    justify-center
    rounded-full
    text-white
    shadow-md
    ring-2
    ring-white/20
    select-none
    shrink-0
  `;

  if (type === "assistant") {
    return (
      <div
        className={`${baseClasses} bg-gradient-to-br from-sky-500 via-cyan-500 to-indigo-600`}
      >
        ✨
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} bg-gradient-to-br from-fuchsia-500 via-violet-500 to-purple-700 font-bold`}
    >
      {initials}
    </div>
  );
}

export default Avatar;