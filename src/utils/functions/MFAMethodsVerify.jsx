
export default function MFAMethodVerification(method) {
    try {
        const methods = JSON.parse(sessionStorage.getItem('mfa-methods'))
        const updatedMethods = methods.map(item => item.method === method ? { method: method, passed: true } : item)
        const remainingMethods = updatedMethods.filter(item => item.passed === false)
        console.log(remainingMethods, updatedMethods)
        if (remainingMethods.length > 0) {
            sessionStorage.setItem('mfa-methods', JSON.stringify(remainingMethods))
            return window.location.href = `${remainingMethods[0].method}-MFA`
        } else {
            sessionStorage.removeItem('mfa-methods')
            return window.location.href = `/Dashboard`
        }
    } catch (err) {
        console.log('error verifying mfa methods', err)
    }
}