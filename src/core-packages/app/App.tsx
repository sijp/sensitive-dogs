import Router from "./Router";

interface AppProps {
  route?: string;
}

export default function App({ route }: AppProps) {
  return <Router route={route} />;
}
