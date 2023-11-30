import { useRouter } from "next/router";
import GetSingleJobDetail from "../../../../components/job/getSingleJobDetail";
export default function () {
  const router = useRouter();
  const id = router?.query?.Id;
  return (
    <>
      <GetSingleJobDetail jobId={id} />
    </>
  );
}
