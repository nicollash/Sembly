/*
* @param $div1
* @param $div2
* @returns {boolean}
*/
const isColliding = ($div1, $div2) => {
// Div 1 data
  const d1Offset = $div1.offset();
  const d1Height = $div1.outerHeight(true);
  const d1Width = $div1.outerWidth(true);
  const d1DistanceFromTop = d1Offset.top + d1Height;
  const d1DistanceFromLeft = d1Offset.left + d1Width;
  // Div 2 data
  const d2OffSet = $div2.offset();
  const d2Height = $div2.outerHeight(true);
  const d2Width = $div2.outerWidth(true);
  const d2DistanceFromTop = d2OffSet.top + d2Height;
  const d2DistanceFromLeft = d2OffSet.left + d2Width;
  const notColliding = (d1DistanceFromTop < d2OffSet.top || d1Offset.top > d2DistanceFromTop || d1DistanceFromLeft < d2OffSet.left || d1Offset.left > d2DistanceFromLeft);
  // Return whether it IS colliding
  return !notColliding;
};

export default isColliding;
