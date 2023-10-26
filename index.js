const eccPoints = [
    {
      x: 0x5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bcn,
      y: 0x6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264dan,
    },
    {
      x: 0xA598A8030DA6D86C6BC7F2F5144EA549D28211EA58FAA70EBF4C1E665C1FE9B5n,
      y: 0x204B5D6F84822C307E4B4A7140737AEC23FC63B65B35F86A10026DBD2D864E6Bn,
    },
    {
      x: 0x9680241112d370b56da22eb535745d9e314380e568229e09f7241066003bc471n,
      y: 0xddac2d377f03c201ffa0419d6596d10327d6c70313bb492ff495f946285d8f38n,
    },
    {
      x: 0xc982196a7466fbbbb0e27a940b6af926c1a74d5ad07128c82824a11b5398afdan,
      y: 0x7a91f9eae64438afb9ce6448a1c133db2d8fb9254e4546b6f001637d50901f55n,
    },
    {
      x: 0xAEE2E7D843F7430097859E2BC603ABCC3274FF8169C1A469FEE0F20614066F8En,
      y: 0x21EC53F40EFAC47AC1C5211B2123527E0E9B57EDE790C4DA1E72C91FB7DA54A3n,
    },
    {
      x: 0x9d5ca49670cbe4c3bfa84c96a8c87df086c6ea6a24ba6b809c9de234496808d5n,
      y: 0x6FA15CC7F3D38CDA98DEE2419F415B7513DDE1301F8643CD9245AEA7F3F911F9n,
    },
    {
      x: 0x8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0dan,
      y: 0x662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82n,
    },
    {
      x: 0x9577ff57c8234558f293df502ca4f09cbc65a6572c842b39b366f21717945116n,
      y: 0x10b49c67fa9365ad7b90dab070be339a1daf9052373ec30ffae4f72d5e66d053n,
    },
    {
      x: 0xfe973c43d29ce39f940d3186a5a57c98231d59c7cedaa2387d07734777efed80n,
      y: 0x126044836b26d12486de99ec2754ba7f5835cf83e369533f1d1844adab9b2c2bn,
    },
    {
      x: 1n,
      y: 1n,
    },
    {
      x: 2n,
      y: 1n,
    },
    {
      x: 0n,
      y: 0n,
    },
    {
      x: 2n,
      y: 10n,
    },
    {
      x: 89565891926547004231252920425935692360644145829622209833684329913297188986597n,
      y: 12158399299693830322967808612713398636155367887041628176798871954788371653930n,
    },
    {
      x: 89565891926547004231252920425935692360644145829622209833684329913297188986597n,
      y: 25583027980570883691656905877401976406448868254816295069919888960541586679410n,
    },
]

const pCurve = 2n ** 256n - 2n ** 32n - 977n // the proven prime

function mod(n) {
    return (n % pCurve + pCurve) % pCurve
}

function subtract(a, b) {
    return mod(a - b)
}

function add(a, b) {
    return mod(a + b)
}

function multiply(a, b)  {
    return mod(a * b) 
}

function power(a, b) {
    let x = 1n
    while (b > 0n) {
        if (a === 0n) {
            return 0n
        }
        if (b % 2n === 1n) {
            x = multiply(x, a)
        }
        b = b / 2n
        a = multiply(a, a)
    }

    return x
}

function verify(point) {
    const verificationPoint = subtract(
        add(power(point.x, 3n), 7n), // 7n is b parameter for y^2 = x^3 + b
        power(point.y, 2n)
    )
    return verificationPoint === 0n // x^3 - y^2 + 7 === 0
}


eccPoints.forEach(point => console.log(verify(point)))

