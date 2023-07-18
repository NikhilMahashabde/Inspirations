import { useAuth0 } from "@auth0/auth0-react";

export default function AuthHomepage() {
  const { user } = useAuth0;

  return <>go to trips userdata:{JSON.stringify(user, null, 2)}</>;
}
