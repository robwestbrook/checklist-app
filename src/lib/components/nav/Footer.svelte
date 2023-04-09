<script>
  import { version } from "../../library/version";
</script>

<div class="mx-auto mt-3 w-full border-t-2 border-slate-300 bg-fuchsia-700">
  <div class="flex flex-col items-center justify-around p-4">
    <div class="text-xs font-semibold text-white md:text-sm">Remember App</div>
    <div class="text-xs font-semibold text-white md:text-sm">
      &copy;{version.copyrightDate} - Rob Westbrook
    </div>
    <div class="text-xs font-semibold text-white md:text-sm">
      Version: {version.versionNumber} ({version.versionDate})
    </div>
    <div class="text-xs font-semibold text-white md:text-sm">
      Github Repository: <a
        href={version.githubUrl}
        class="underline hover:bg-white hover:text-fuchsia-700"
        target="_blank">{version.githubUrl}</a
      >
    </div>
  </div>
</div>
