export const Loader = (
  <svg
    width="100px"
    height="100px"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <g transform="translate(20 50)">
      <circle
        cx="0"
        cy="0"
        r="7"
        fill="#00527d"
        transform="scale(0.99275 0.99275)"
      >
        <animateTransform
          attributeName="transform"
          type="scale"
          begin="-0.375s"
          calcMode="spline"
          keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
          values="0;1;0"
          keyTimes="0;0.5;1"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </g>
    <g transform="translate(40 50)">
      <circle
        cx="0"
        cy="0"
        r="7"
        fill="#00527d"
        transform="scale(0.773605 0.773605)"
      >
        <animateTransform
          attributeName="transform"
          type="scale"
          begin="-0.25s"
          calcMode="spline"
          keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
          values="0;1;0"
          keyTimes="0;0.5;1"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </g>
    <g transform="translate(60 50)">
      <circle
        cx="0"
        cy="0"
        r="7"
        fill="#00527d"
        transform="scale(0.42525 0.42525)"
      >
        <animateTransform
          attributeName="transform"
          type="scale"
          begin="-0.125s"
          calcMode="spline"
          keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
          values="0;1;0"
          keyTimes="0;0.5;1"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </g>
    <g transform="translate(80 50)">
      <circle
        cx="0"
        cy="0"
        r="7"
        fill="#00527d"
        transform="scale(0.113418 0.113418)"
      >
        <animateTransform
          attributeName="transform"
          type="scale"
          begin="0s"
          calcMode="spline"
          keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
          values="0;1;0"
          keyTimes="0;0.5;1"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  </svg>
);

export const roundLoader = (
  <svg
    width="80"
    height="80"
    viewBox="0 0 44 44"
    xmlns="http=//www.w3.org/2000/svg"
    stroke="#00527d"
  >
    <g fill="none" fillRule="evenodd" strokeWidth="2">
      <circle cx="22" cy="22" r="1">
        <animate
          attributeName="r"
          begin="0s"
          dur="1.8s"
          values="1; 20"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.165, 0.84, 0.44, 1"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-opacity"
          begin="0s"
          dur="1.8s"
          values="1; 0"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.3, 0.61, 0.355, 1"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="22" cy="22" r="1">
        <animate
          attributeName="r"
          begin="-0.9s"
          dur="1.8s"
          values="1; 20"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.165, 0.84, 0.44, 1"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-opacity"
          begin="-0.9s"
          dur="1.8s"
          values="1; 0"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.3, 0.61, 0.355, 1"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  </svg>
);

export const notFound = (
  <svg enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="30" fill='#ff0000'><g><path d="m437.02 74.98c-48.353-48.351-112.64-74.98-181.02-74.98s-132.667 26.629-181.02 74.98c-48.351 48.353-74.98 112.64-74.98 181.02s26.629 132.667 74.98 181.02c48.353 48.351 112.64 74.98 181.02 74.98s132.667-26.629 181.02-74.98c48.351-48.353 74.98-112.64 74.98-181.02s-26.629-132.667-74.98-181.02zm-21.214 340.826c-42.686 42.686-99.439 66.194-159.806 66.194s-117.12-23.508-159.806-66.194-66.194-99.439-66.194-159.806 23.508-117.12 66.194-159.806 99.439-66.194 159.806-66.194 117.12 23.508 159.806 66.194 66.194 99.439 66.194 159.806-23.508 117.12-66.194 159.806z"/><path d="m256 271.552c-65.876 0-119.471 53.595-119.471 119.471h30c0-49.334 40.137-89.471 89.471-89.471s89.471 40.137 89.471 89.471h30c0-65.877-53.595-119.471-119.471-119.471z"/><path d="m214.773 158.594h-30c0 14.009-11.397 25.406-25.406 25.406s-25.406-11.397-25.406-25.406h-30c0 30.551 24.855 55.406 55.406 55.406s55.406-24.855 55.406-55.406z"/><path d="m352.633 184c-14.009 0-25.406-11.397-25.406-25.406h-30c0 30.551 24.855 55.406 55.406 55.406s55.406-24.855 55.406-55.406h-30c0 14.009-11.397 25.406-25.406 25.406z"/></g></svg>
);
