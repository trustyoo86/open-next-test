import { useRouter } from "next/router";

export default function AboutPage() {
  const router = useRouter();
  const { aboutId } = router.query;

  return (<div>About page dynamic route: {aboutId}</div>);
}
