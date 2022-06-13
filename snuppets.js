
/////// SMOOTHDAMP /////////
/* Performa un interpolazione "a molla" verso un parametro target senza oveshootare
Es:
let smoothValue, value;
let vel; (parametro di riferimento)
smoothValue = smoothDamp(smoothValue, value, vel, 0.1, 0.016666)
*/

function smoothDamp(current, target, currentVelocity, smoothTime, deltaTime)
{
    smoothTime = Math.max(0.0001, smoothTime);
    const omega = 2.0 / smoothTime;

    const x = omega * deltaTime;
    const exp = 1.0 / (1.0 + x + 0.48 * x * x + 0.235 * x * x * x);
    const change = current - target;
    const originalTo = target;

    target = current - change;

    const temp = (currentVelocity + omega * change) * deltaTime;
    currentVelocity = (currentVelocity - omega * temp) * exp;
    let output = target + (change + temp) * exp;

    if (originalTo - current > 0.0 == output > originalTo)
    {
        output = originalTo;
        currentVelocity = (output - originalTo) / deltaTime;
    }

    return output;
}