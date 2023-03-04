import pages from "@sensitive-dogs/pages";

interface RouterProps {
  route: string | undefined;
}

export default function Router({ route = "Index" }: RouterProps) {
  const Page = pages[route];
  return Page ? <Page /> : <div>Page not found</div>;
}
