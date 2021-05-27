import PropTypes from 'prop-types';
import * as React from 'react';
import Svg, { Circle, G, Path } from 'react-native-svg';

function Libra({ color, height, width, style }) {
  return (
    <Svg height={height} width={width} viewBox="0 0 512 512" style={style}>
      <Path
        d="M320 392v62.857L285.844 469.5a9.644 9.644 0 00-5.844 8.858 9.642 9.642 0 009.642 9.642H352v-96zM296 72l8 8-.115 16H328v32h32V56c0-15.46-13.28-32-28.517-32A28.116 28.116 0 00312 32a28.668 28.668 0 00-8.115 20l.115 4z"
        fill="#cb84d3"
      />
      <Path
        d="M321.153 26.03c8.806 28.364 21.534 45.318 29.992 54.145A31.915 31.915 0 01360 102.269V144h48l-14.7-24.5a55.9 55.9 0 01-7.885-32.065c.644-10.89.831-24.386-1.417-31.438-6.28-19.7-17.943-32-39.97-32h-12.545a27.126 27.126 0 00-10.33 2.033z"
        fill="#5f4bbc"
      />
      <Path
        d="M453.07 192.386l-35.516-50.737A32 32 0 00391.339 128H296l-48-8-51.369-88.062A16 16 0 00182.81 24H168a16 16 0 00-16 16v8l32 8 40 96 72 16 16 32 56 24 16-56 38.333 44.333L400 264l24.333 24 31.143-62.953a32 32 0 00-2.406-32.661zM400 320l-24 48 72 88-19.359 12.906a10.423 10.423 0 00-4.641 8.672A10.422 10.422 0 00434.422 488H456l32-24z"
        fill="#cb84d3"
      />
      <Path
        d="M302.421 151.439L320 128l3.42 5.7A70.647 70.647 0 00384 168l-16 56a109.256 109.256 0 0132 77.255v105.953A411.99 411.99 0 00408 488h-32a64 64 0 01-64-64V200l-6.6-6.6a32.1 32.1 0 01-9.4-22.7 32.1 32.1 0 016.421-19.261z"
        fill="#5f4bbc"
      />
      <Path
        d="M376.159 311.841l.142-.142a7.942 7.942 0 00.373-10.774c-25.626-30.236-31.157-75.872-32.348-93.564a7.906 7.906 0 00-7.9-7.361h-.221a7.9 7.9 0 00-7.886 8.39c1.233 19.58 7.215 68.825 36.183 102.925a7.926 7.926 0 0011.657.526zM376.318 391.682l.132-.132a7.91 7.91 0 00.635-10.45c-7.551-9.747-15.252-25.011-22.523-44.716-3.966-10.75-6.972-20.6-8.793-26.97a7.893 7.893 0 00-9.509-5.48l-.207.052a7.894 7.894 0 00-5.683 9.82c4.7 16.513 16.878 54.828 34.105 77.122a7.9 7.9 0 0011.843.754zM346.388 396.042a7.9 7.9 0 00-10.152-4.136l-.186.074a7.91 7.91 0 00-4.291 10.546 222.679 222.679 0 0032.855 52.794 7.894 7.894 0 0011.6.464l.151-.151a7.89 7.89 0 00.449-10.683 208.028 208.028 0 01-30.426-48.908z"
        fill="#4c3aa3"
      />
      <G fill="#c04a42">
        <Path d="M68.389 203.694a130.065 130.065 0 01-30.248-3.559l3.718-15.561a114.33 114.33 0 0059.355-1.691l13.372-4.011a129.833 129.833 0 0174.828 0l13.372 4.011a114.34 114.34 0 0059.355 1.691l3.718 15.561a130.336 130.336 0 01-67.671-1.927l-13.372-4.008a113.894 113.894 0 00-65.632 0l-13.372 4.011a130.284 130.284 0 01-37.423 5.483zM144 144h16v24h-16zM144 112h16v16h-16zM144 80h16v16h-16zM144 40h16v24h-16z" />
      </G>
      <Circle cx={152} cy={184} fill="#ffba40" r={24} />
      <Path
        d="M272.646 299.151L232 204.309l-40.647 94.842-14.707-6.3 48-112a8 8 0 0114.707 0l48 112z"
        fill="#c04a42"
      />
      <Path
        d="M287.219 288H176.781A40.066 40.066 0 00216 336h32a40.066 40.066 0 0039.219-48z"
        fill="#ffba40"
      />
      <Path
        d="M112.646 299.151L72 204.309l-40.647 94.842-14.707-6.3 48-112a8 8 0 0114.707 0l48 112z"
        fill="#c04a42"
      />
      <Path
        d="M127.219 288H16.781A40.066 40.066 0 0056 336h32a40.066 40.066 0 0039.219-48z"
        fill="#ffba40"
      />
      <Path
        d="M403.5 260.5l-14.2-7.1-23.8-.9 2.5 28 15.849.392 14.742 11.228c8.665 6.6 21.216 5.787 25.742-4.12z"
        fill="#cb84d3"
      />
      <Path
        d="M439.993 288a7.955 7.955 0 01-4.584-1.449l-42.333-29.666a8 8 0 119.182-13.1l42.333 29.667a8 8 0 01-4.6 14.551z"
        fill="#ffba40"
      />
    </Svg>
  );
}

Libra.defaultProps = {
  height: 120,
  width: 120,
  color: '#FFFFFFFF',
};

Libra.propTypes = {
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  style: PropTypes.object,
  color: PropTypes.string,
};

export default Libra;