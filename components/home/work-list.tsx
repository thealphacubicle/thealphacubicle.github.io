import { experience, roleLabel, type ExperienceGroup, type Role } from "@/content/experience";
import { cn } from "@/lib/utils";

function RoleRow({
  role,
  nested = false,
}: {
  role: Role;
  nested?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative grid gap-1 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-6",
        nested && "pl-1",
      )}
    >
      <div>
        <h3
          className={cn(
            "heading text-foreground",
            nested ? "text-lg font-medium sm:text-xl" : "text-xl sm:text-2xl",
          )}
        >
          {roleLabel(role)}
        </h3>
        {role.location ? (
          <p className="mt-1 text-base text-muted-foreground sm:text-lg">{role.location}</p>
        ) : null}
        {role.summary ? (
          <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
            {role.summary}
          </p>
        ) : null}
      </div>
      <p className="font-mono text-sm uppercase tracking-[0.14em] text-muted-foreground sm:text-right">
        {role.period}
      </p>
    </div>
  );
}

function Group({ group }: { group: ExperienceGroup }) {
  const [primary, ...precursors] = group.roles;
  const hasPrecursors = precursors.length > 0;

  return (
    <article className="relative pl-8">
      <span
        aria-hidden="true"
        className="absolute top-3.5 left-0 size-2 rounded-full bg-primary"
      />
      {hasPrecursors ? (
        <span
          aria-hidden="true"
          className="absolute top-6 bottom-3 left-[3px] w-px bg-border"
        />
      ) : (
        <span
          aria-hidden="true"
          className="absolute top-6 bottom-0 left-[3px] w-px bg-border group-last/work:hidden"
        />
      )}

      <RoleRow role={primary} />

      {precursors.map((role) => (
        <div key={roleLabel(role)} className="relative mt-6 pl-2">
          <span
            aria-hidden="true"
            className="absolute top-3 -left-[22px] h-px w-4 bg-border"
          />
          <span
            aria-hidden="true"
            className="absolute top-2 -left-[26px] size-1.5 rounded-full bg-muted-foreground"
          />
          <RoleRow role={role} nested />
        </div>
      ))}
    </article>
  );
}

export function WorkList() {
  return (
    <ol className="space-y-10">
      {experience.map((group) => (
        <li key={roleLabel(group.roles[0])} className="group/work">
          <Group group={group} />
        </li>
      ))}
    </ol>
  );
}
