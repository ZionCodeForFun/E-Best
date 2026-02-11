import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import "../../style/tracker-section.css";
import { useNavigate } from "react-router-dom";
export function GPSTrackerSection() {
  const nav = useNavigate();
  const features = [
    "Real-time GPS tracking",
    "Theft & movement alerts",
    "Mobile app access",
    "Geo-fence alerts",
    "Front & Rear Camera",
    "HD Video Recording",
    "Night vision & Loop Recording",
    "Audio Recording",
  ];

  const images = [
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1QampKvKHT_Fo4h2V3sphH2gSn3gJf83Uqg&s",
      alt: "GPS tracker device",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROQCIvnRA7zL9bjMIrG3xqrzQVuGX9ZNL9QA&s",
      alt: "Vehicle tracking dashboard",
    },
    {
      url: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxQTEhUTExIWFRUXGBcaGBcYGBYcHxoZGSAYHyAbGBobHSghIB8mGxcYJTEnJSorLi4vGh8zODMtNygtLisBCgoKDg0OGxAQGzImICUrMistNi0tLy0tLSstLS0tLS8tLS0tLS0tLS0vLS01MC0rLS0vLS0vLy0tLS0tLS0tLf/AABEIAN4A4wMBIgACEQEDEQH/xAAcAAEAAgIDAQAAAAAAAAAAAAAABQYEBwECAwj/xABEEAACAQIEAwUEBwUGBgMBAAABAgMAEQQSITEFQVEGImFxgQcTMpEUI0JSobHBYnKC0fAkM1OSouEVQ1SywtIXg6Nj/8QAGgEBAAIDAQAAAAAAAAAAAAAAAAIDAQQFBv/EADURAAIBAgQCBwYFBQAAAAAAAAABAgMRBBIhMUFRBWFxgZGh8BMiMrHB0RVCcuHxFENSYpL/2gAMAwEAAhEDEQA/AN40pSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKi+Kdo8LhzabExRt90sM3+Ua/hUUntE4aTb6WvqsgHzK2qLklxLY0akldRb7mWmlYfDuKwzi8M0co55GVredjpWZUitpp2YpSlDApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQContVxxcFhZMQ2uUd1fvOdFX579Bc1LVqT2x4lsRisJw9DbMVY9M0jZFJ/dAY+TVCpLLG5s4SiqtVRe277EXT2ecSxWJwoxGKyXkJMYVctkGlzrzN/S3WppuKwiYYcyr74jMI7962utvQ1yfd4aD7sUMfySNf5CqL7JoGnbFcTmH1k8hVPBFsSFPS+Vf/rpdq0TLhGop1dktl1vZeG5salVmfjsj8TTBw5ckcZkxLEXIvbIinkTcE+B02qX4dxaOZ5kjufcv7t2t3c9gSqm+pW4v0JqSkmUypSirvlcyMbi0ijaWRgiICWY7ACtG9tfadPiWaPCloINrjSR/EsPhHgPUm9hn+2rtOXlGBjNkjs0tvtORcKfBQQfM/s1q+tStVd8qO90b0fFRVWort7HJNcVb+yPs8xWOUSC0MJ2ke/e/cUat5mw8dKuE3sUGXu405vGLQn0e4/GqlSm1dI36mPw9OWWUtfH5GpMNiHjYPG7I42ZSVI8iNRW2/Z77T2Zlw+OYEsbJPoNeQktp4ZvnzNa87UdlMTgHCzoMrfDIpujeR5HwIBqDpGUqbJVaFHF0+fJo+uqVr/2P9qDicOYJWvLBYAndoz8JPUi2U/w8zVti4osr4iCMlJobA5l2zrdHAv3lP6EaVvxkpK55OrQnSm4Ph6uSLuACTsBc+QrG4ZxOLEJ7yCRZEuRmU3Fxy89R86iexHHmxcDe9ULPDI0UyjYOh3HgR+N+lVPs630Djc+D2gxQ97EOQbU6cgNJF8cq9Kw57PgyUcPfPF/FFX7Ut/uSHartdPgOIQrLkOCm55bMlrBrtfXKSrbbNber6DVK9rvCff8ADnYDvQkSL5DRvTKSfQVley/i/wBJ4dCSbvHeJvNLWv4lCh9awm1NxfaTqU4yw8asVqnlf0Za6UpVhpilKUApSlAKUpQClKUApSlAK09hP7R2nYnURFvT3ceX/v1rcNaf7Hi3aLF364j8WU/lVVTePab+C0jVf+jLl7VsWY+GT2Ni+RPRmUH/AE5qzfZ7hBFw3CqOcSv6yd8/i1Q/tmjJ4Y5H2ZIyfK9vzYVY+yTg4HCEbHDw/wDYtZ/udxB6YRfqfyRUOw+MAj4rxFtSZpiD+xCpZR8mt6VYfZ7hfd8OgJN2kX3zsd2aUlyT6MB6VWOwuBZ+F8Qwg/vBLiorftFAB+P5Vcuy0Tf8PwyOrIww8aMrAqQQgUgg6jUVinw7CzFte8l/kvBLQ+aOK40zzSzNvI7Of4iTb8alewnBBjMdDA3wEln/AHEBJHrYD1qCkQqSpFiCQR0Iq4eyXHrFxKLMQBIGjBP3mHd+bAD1rShrJXPS4huFCWTgtPA+ho4woCqAAAAABYADYAdK7UpXSPFEb2h4PHi8PJBINHGh5q3Jh4g18t4mAo7IwsysVI8VNj+Ir6zlkCqWYgKASSeQG5NfKfF8UJZ5pQLCSR3A8GYn9a1cSlozv9CSl78eGniWf2R40x8ThAOkgdG8ipYf6lWttcY+p4vgpRtiI5oJP4B7xNOt7itO+y6LNxTDAcmc/wCVHP6VurtJhXkx3DsqMUR5pHcA5VypZQx2BYtYDwPSlH4O8j0lZYntg7+DIvgn1PHMZENFxEMcwH7S2U/Ms5qK9rZ9zi+HYsaZJLMfBWjYDysX+dS0Qz9oHI2iwQDeBZwQD6Neor25rmhwsY+J5jlHpb82FTl8D7fqa9HXE078Yq//ADb5GxOKYUSwyxHaRHQ+TAj9a1j7A8WSmKi5K0bjzYMD/wBi1titO+wQfWYs8ssX4l/5VKfxx7yrD64Wsv0/M3FSlKtOeKUpQClKUApSlAKUpQClKUArXM3ZrEx8eXGRxFsO477BkGUshQ3BNzqA2g51sVmAFybDxqOxfHcPH8Uq+mv5VGST3NihOpFtQV7q3iduPcJTFYeTDyXyyCxItcEEEEX5ggH0rngXDBhsPHAHLiNcoZrXIG17aaCw9KhX7cQn+7Vn8dAPnrXke3MY+IKP4yfyWsZo3uWf02Iy5crtv3lpiw6KWKoqljdiABmPU23NetQHD+1+GkNveqp6E7/O1ZXC+0WGxEjRQzK7oLstmBABtfUC4vppUk0UTo1I/EmaL9qnAThcc7AfVzkyofFj3x6MTp0K1UEcgggkEG4I0II5g19J9v8AsyMfhGjFvep34j+2Psk9GGnyPKvmyRCpKsCCCQQRYgjcEda0a0Msj1HRuJVajZ7rR/Q3X2M9qsMiLHjT7qUAD3tu4/ibDut15eI2Fxl7YYBVzHG4e3hKjH/KCT+FfMNKlHESSsU1eh6M5Zoto2d7RfaUMTG2GwmYRNpJKQQXH3VG4U876nawG+saVIdn+ESYvER4eMd5za/JV5sfAC5qqUnN6m9Ro08NTtHRLVmyfYZwE5pcaw0AMUfiTYs3pYC/i3Stw1h8H4bHhoY4IhZI1AHj1J8Sbk+JNZlb9OGWNjyeLxDr1XPw7DyTDoGZwihmtmYAXa21zubVC8f7LR4vEYaeR2H0ZsyoLWLXU97nui/Kp+lSaT3KYzlF3i9TF4oziGUxrmkCPkW4F2sbC50Fzaqb7JOzEuCglOITJLI47t1PcQaXKkjdnq+UrDim0yca0o05U1s7X7hSlKkUilKUApSlAKUpQClKUB1lkCgsxAAFyTsBVG7R+0AR3TDqCebuwAHkNyfSqp7WO2n1z4MHKkZGa1yXJVW1tpYE2sTyv0rWE/HPuox8yF/AXNVSlLaKOthKOEhFVMRPXlv42+RfOIdqp5dXnPko29W/lUKeIBjq1z1drn0G34VWosXI5+yvkLn5mrPwHhWdhmYn1I/I1FU5vc6H4vhqatSj5L9jJXFkLYG5PQ1jviG6CsbES5XK3LDMyjS4XKSNz5bVkRNoASdRe5GhtvzNrX8Kg4svhioyWZrS9u/ex1XEg6HQ1Idh8Yy4supIYCUXH7w+e21RWIjykHkRcEbH+vXepLsriB9JtkANm71zrsdRasJDEzWTRXT/AGNz9lu0IxKWkGWVdG+6xGhKHzBFuRHMWJ1n7aOyvupRjYl7kpAlAHwycm8mH4j9qpTAuYmcciyi3RgQAR5oFHmhPncXxMeJhfD4ixjdLFvPmehBsQfCs5lUjlZyoxeFre0htxXUfNdKmONdnJ8PiJMOyMzITYhT310sy+BBB8Nq6x8AktmcrEumrm1idgQATWtlZ6JVYNJp7kTW9vY92W+j4f6VItpZwMt91i3A/i0Y+GXpVH7IdiUmlVmcuikM1l7psfhIJBNyLacga24ZyZGEkkirkSwA90oJL/aOo2H2q2KMLPMzj9J4rPH2UH2/YnJp1QXdgo6sQB8zUfjeNKkbuiPJlUnuqQDbo5sp9CajIsOv0hDG9z7uTvi0p0aLQuV/MmnaB29xKpn1KMMrmIHXmojsb67G9bDlocaFKOZL167zBm7V4hG1w7ZS5QHJpmUElQ2YXIysPSsjD9t1Js8LLa1+8l9b8mI6HYmo/jfERCsQVQpjYlcrTW+B11U2N+/fnfmdarHFONO15JRmYBdSEBsua1rfvt8zVTqWdrm/TwqqQzOKS7WbKwvanDP/AMzKbXsRsPG17VIQcShe2SaNr6AB1Ovoa0Li+0jACy5det/yArqkrNHmDlb5ibaajLyHPxqxSlxRqTpUHdwk9Ndv4PoalfOeH7aY2E93EMR0O1WHhvtZxQsHSOTwF1P5frU7s1ssXtLxX2ubrpVc7F9p/p0cje7MZRgpB31F9qsdZINWFKUoYFKUoBSuruALkgAczpWBxTiPu4JZQjHKt1vpdiSLWOo1tqRz0vQGtuy3CcNxHGcQXE4ZJBnDrIcwcBy4Cq6kECyX0NVv2pdgcNgBC+HMv1jOCjMGACgG6m2bcjcmoePjOIilaOCT3bSsqMBsxvZQxYAWBY76am9eXafEYvIrYiZHF7KiZO6SDqESyi4XUjwpclY68R4GuGxLwLMJchys4XKM3MAXO3nverb2fjjU7km3Q861jDiGtcNb5fqKyMNxXEFiqSuBzsbAedqze2pmMXJ5Yq7ZMYpzZrWuZZDc7btvbzqQwgITDsSpJdhdb21N9LgdKggrs2UorR6m7WbveRO/jUnBKVVVBUKuqjQ2PUAc961cy3PQrDzccnBSv5W5fUz+08WR9NDZG08TY/glY/ZmS2MPk+noK8+I40ykGQlzte1tBcjbxrpwNT9IZyVtaQ/EubQa92+b7J5dKxJ3uS9m6VOMZPq80bAnZbbnW29r/wBeVZ0Uu9jcFQf51XjjbCx1H8Nj86zExiKPeO6ogUZmc6Lc21OttSB67VTFEaisrskOI4Qy94N3lvYd7UEAZTqL6rpfbXkarWaQjKA+csAFyncnlZRe5NtHI216yOI7S4MAqOKYYA9IcRKeu626msBu0eA94Jf+LgOuzJgZtN7WzKfvHXxq/JLkasMTSjvJdW/2NicB4UYA6AnP7uNnZQ1ma8t9GNrWAG528694HKuSWIuIQxsig3Dk6qpI+d61jP2jwj3zceluyhSTBi1uRfU5bC2u3LWsTEtgWzFOJwSHJYCT36G+vN1O96m8y2RTGNGbblVWvU/rY2bj+I4ZcUjSSwhRFKCXkDi5aKwOZxrYG3rpUfxvtXhLMqTqfq2Fo10vdTbROinnWuVUKyWQDunZV55dRl3FuddPeHJJva79fH0ql1nyOpDoyGjcr2Ljx/tPBiwqQTSSlTmIdCthptcC50qv45XaOSytciw0qD4HOFdyTbQfnU0eIoN7elxVcpNyubVLDKNH2a21XiVrEwOQO4w1G6t/LxqSwzlYgGFrsw100IH6ipM4mNhqSL8r3/lUViUGVl94z3JIJ+ztYDXW1Xe3vuc78HlDMou901y1IXHpYnUHyINbg4Vj4HUe5eI6DRClx6CtNy4SUE2F/Ij9TWRgI7E++Wa1hb3eXfxuDy6VsKcXxONLCV47wfgzcfs6xn9uxsZ+1Zxrf4Tl/UVsWvnf2dYuWLiEPu1YK7+7N1tdW2DG2muU6dK+hYZMwvYjcEEEagkHcC4uNDsRYjQ1K5RKLjujvSlKGBXDNYX6ev4CuaxprM6poQLOw7p/duDr8QJBHOOgOYkLHO3jlW5sBc2JuAblbXB22HUxnbGQDCsCbZniUerrf8AT6VN1XO3eHd8MDGrMVkVsqhmJFmXQLruwv0FybgGoz+Fl2HSdWKfNGp+IcIwxYlsRgwSftYjDgn8aw8RwaBNGnwsZ3yySqht1ykXt6VWuIcIuxCzRWHJjqAdri+n61gngv/8AeH/Mao9zmzsv+ri7KlHwj9y3z8OwgjLJiIXcD4UkVrt4dzbfmKgVZbhSbXBawHLT0+0K8MHg1iBvIrFhYWPXS4rzxEgD5iwtlI35kg/pVcsreh0MPOrGleqle/Vou7vMrKdSA2XXWx2HU7VxmJ26+A9NTXaHFQhBmxSrcaoPek68rXC/jau78SVFz3McZ0UWJke3MlWXKo6A286gm27JGZ14qL9fM6u50uLa9V6Hoa44VxBVxDEyBDawJcD7nO+nOvFeJ+9u8eInUXJsZLBfAAhja212J6moTiODkZyysZc2uclbnzJ8t6sjHW0vXkalbEzcFKMLrx+Rs+PHQquad5pUa/8AdRxSjS27pmP9b1BdsnmaOGCKCVlKiZysUtiWv7tdQT3UOY+Lj7tZHs17GYadmxOLYtHh7F49GzMdFWy3ZhtysT3dda3YnanDZlizor27qt3Sd/hvvsdulbEKaWpxsRipzvF7HzMvBsXYZMJidtbQSanX9n+rVLzcLncDNw3GG3SCYa89lr6Rn4miC7vGgOxZlX8zXVOLRkAiaEg7EOpHzvVtzTPm2ThmIWNlTh2LUnYmCU+tyt9qipOC4q3ewmJvcEEwS+N9cvl8q+ppeLxqLtPCB4yIPzNdxxJCucMjL1DAj5ilwfP3AJCMOpxUU6Lh2Cs3umuYZDpbMN0e67fC6D7Ne2LxGHIb3Ejkd7uyKqv8rgka/dG1bixvaXBzRyROVljsVlCguLG9wcoNza+g1G9aM7Ydm1weLeNZ8y2DxEg3924OUE8za48bX51TOipHSw3SVSkknqlpbq/bgYsHETEzEKpvYd5QbeV716vxeSQZljSym5tGtrjkSAP6NV8SEE31trr15fnWdhoZGXMZijEjKCxFx1NvG1vKsKhHilchVx9SUrwbXeTWD4vDKO/9S/MC7qfL7Q/1V7jEx5h7uZXOtwFba25zKB0qvTpIytmy5lNmuNT0bz8a9uG4WYuFjs7kd1QCSdL6AC+1Vywq3i368/M28P0zWi1GpquPMlHmZlJWwbUaDoenpUbFxdgwzhSAdRoD+e9SxkxMSDPhYEVSLu8OKFyb/Ec+W5PS2u1ZPDcZip393DDg2axPwyDQbm7y251OFK26XruIYrHqq04TkrKzts+v4keXZbjEizwuAMomjPge8vOvo6UZWDaAMQrbC5NgpOlyb2Ua/a8K0h2Txn9uWHFQxORJkEccYBEin4ixNrKQToeVbxxn92xF7hSRbNuNdk7x8hqatirHPrVc6Wrb4t/yz2pSlSKBXjCbs++hA+10B2It9rlf5iw9q8YhZ3HWzbHpbcn9kbAbjrQHtUF21I+isDI8WZ41zITm7zqLC2uu3rU7Va9oImODZcPG0khZbAKrCwIJzKdCLXHnasS2LKTtOLvbU0Bj8Th0kdJDZxo2ji9upHnWIZcGdinrm/WpvicAJY4rhlnN+/edNT4ZiNzUDhcFhQT76KTwySZT594Nfy02rUUUuZ6WWIq1G2lTa69/JvzsS2Hw0OIeOODvC+ma3dKgkkZdLBRfltyrMx3Aooz3sXCT0sCQdeWcm2m9v0vg4DGYOAgxJiARsGaHc7m5jPhra9dMXxuEsWXDoWNiWld31O+mgPLW1ZWVEJzrza4K35Ut+18CNmhjPeLxKxbQAZTpp8KLpfeu0GBfEyOEk92saqMxBIuQTY22FgxPoNSRXXF/Wn3zPClrCwAWwG3dUaetYXC8aM8qEnI4YMQR8JFiRfpp1qymtbmljalqWS+ub7mPgoDHNJE9the17HYgi3Ig6edSCkXOUncX3sNBoNa9eHcMOInaRRkiYAJci9lyqLjxC1duHey/6QATiCi87AkH1JFZlTcmVYfGwpU0rXav6ud/YiUc49JLZGEO5yglWk56G9yKvPEez0MzEtm1BBytpY8tq15xjstDwpZYJZ2lixsMi3RATFJE0TIxUt3hcnmNqrOFwmeT+z48wkKNEQwL3QBf+8C3O511JNXrQ5knmbZf/a9wkHDwzKQRGxQlrnKGA1Oo5oB61qYxj/Eh/wAx/wDetv8ACOKh8McNjMRhpVIszvPHExtsRZmuRpqbVHns/wAL/wCsA8sZh/1WhE1iIx/iQ/Mn/wA63Z2E7PoOGospsJszkLcXBIAtvoQoPrUHHwDhQN/pat4NjYAP9K3rI7VcZklQQ4bGYfDqAAGhmjc5RplzZ1Zfl61kFp/4LBHm00e+bObXvvrpbYVrT2mr7zHdwXCwxKLaiwBOhv0NV7E4dM0keIxplLWBZomlZbEG8bmSwPK4O1bR7LcCw3EYpJ87RgS+7jDZb5I44lFxfresA1LjeFSRwCVwgV5AoGb6z4b3KjZNCNbG/KuVNjcgEc/L9K2/xH2UhxZZ1YDUBrj8qqHHPZ1jYjYYZpk3DRMungwJv+FYMlLmlJGm5FuWoG2/nXOGx0kTLIrlHXYiykeVvCrFw3snjA4dsMwy7B0uCSLbG+gHWrZEOJhcoBCn7OQW+VrUBQ5e1GJkiaF5DIr2uGWO1hY3BIuDcDUGsbhUOJZv7Ms5cDX3BkzAHr7oE2P6VYMZ7P8AEyuz5GUsSSAthc72HKrx7PeE4vAKyR4cEOQXYqczW2BPQXNh4nqaAq3ZHsPxB8VE8kMsSZ1aSRyb5QcxuGYMS1rbHe5rfWOF42HUFdRf4tNRcX32uK7YV2KguuVuYrpKMzqvJe8fE7KNVN9btoQQVXkaAyKUpQCvDEJqrgaqfDVT8QvlJ6NYWuVUXr3pQHCNcA9fMfga5rHaErrHlG5KkaE946EfCSxBLWO23Oq5xDt5hoOIR4Ca6PIgIckZQxNlU9M1jYnw01oC0ugOhAI8ajcX2cwsnx4aJv4APxFVDGdu8Q80v0VMOcPFIYg0zSKZnX4/duAQqqbi+VrkHas/De0FVA+l4SfD9XUe/j9Hiu1vFlFSyu1yOZXtcyMT7OeHv/yMv7rMP1qMn9k2DPwvKvqp/MVbuEcdw2KF8PiIphzyOpI8wDcetSNRJGssR7HIGUr9JksRb4VqKT2BwA3+mSkdMq61uKlAVLgXs9weGAshkYc329FGlWF8CpFhoOgtWXaubUBVOP8AYSDFhRKz929iCBa+/LwFQbeyDC2sJpgOl0/9a2PSgNYt7GML/jzf6P8A1rofYthv+ol+SfyrZ0psNN9ORO/Owrysp3u3oT4aW0HOgNbf/CuG/wCom+SfyriP2NYU3tiJtDb/AJfLf7PXT0NbJhDEWOgFxv3vn5eZ8RashVAFgLAbCgNbf/DmFNg085A21Qf+NWTgXY2LCxiOJ3ygk6kHU9TarNSgMWHCZeZrJUVzSgFKUoBSlecswWwO52HM7bDwvr0oBNLlG1ydFHU2JtfloDSCPKN7k6k9T1tXWCI/E3xkDoQuguqnKCRcXuddfID2oBSlKAUpUTxnj8UAIJzvyRd/4jy9aw5JK7Mxi5OyJaqd7Q+JmKJYcNlXF4pvdo4AuiAfWSnn3E0HiVqF4x22kKMGKRLY3yk3t+8T+QFVzsnw8ze9xr91plKQA/Zh+9bq573lbrWKUvaSstiVem6ULy34IwMayKEhiFoohkQeW7HxJ1rjC4yRD3HYeR/Su5wt0LAGwaxbkfIf1vXOEjy3fcj4f3uvpv52rtJJKxwW25XLGOBwzKrzxo0v+IoyuD4OlmBHnXqzYnDAGHiMqrfRMQoxC+WY2lA/j0rE7LI1nOa66WF/xrK4xw55SCpBAGinTXqDqPw9a1ZU4uVmbcaslG6JHBdusWg+vwSzrzlwcgb/APGSzDyDGpvhnb7ATNk+kCKT/DnDQvfpaQC/peqpw7hcqHvRi1tWByn1vvz51m43CxSrlmjWRfuuob8DeqZUV+Vl8Kzt7yNiK19RqK5rUsHZsRG+ExE2EO4EMpKE/tQyXX5VkYrthxHARtLiPo2LhQDMwvBJuBt3kJ1GgtVThJFyqRZtKlY/DsWJoo5VBAdVYA6EZhex8RVXxXbCVeJw4H6DKqP7z698oV8iO4EVjlN8o3II5qN6gTLhXWR7C/8AV+ldSzHZbb6k/jYb/htRY9bk3P5eQ/r8qA5iWw135+Z3rvSlAKUpQClKUApXnJOoNr66aDU2Jtew1tfnsK81Vn1a6DTug6/ZPeKnQg5h3SQetAdpJjfKouefIDzO/wAgf1rtFFa5JJJ3J/QDQeldo4wosoAA2AFh8q7UApSlAKUpQFJ7acfYSDDxMVsLyMDY3Oyg+Wp8x41SeJ4wqAq7mvX3hZ2ZjclmJPUk1C9pOIrDGZDy2HU8hWhK85XOpTtTgRMfDTjsYuHLH3aDPiGF7BB9kW5sbDrr4VtvDpEQFRwNLKpGXbkAbGqn2O4E0OEu39/KRJP96+6of3QdupNSSsygrYgX13A+XPauvQpZY9Zw8TXzzvwJZ7DQ2GtvU8qjJ+z5kkzA5VtYALYA/h4mjYpwDezk/CxAvcagX8wPOprDYsyLmAPyNX6x2Ne0ZaMwIcAYI1jUgux35DxN+grF4lw1PdNKkrF1F81/y6VnYyYq4a2lrVFzTtijkjQpGdHkI3F9l63NZjfcxK2xMYHiwEMBkPfkAAHNj1/L51lSSQllUsAzXygaE28PWo/GcGSQAqxUhMiEG4UeA62uOW9Rc/Cp43DpZyLIhOuVPtMwOtz4X3bwqKjF8TLlJbq5YZ+HHdTqPSqjioDxLiMeCX+4w5EuII2Mm6p5KNel9DU2nGW9xJKqkMLpEjkgMw5nnYEi/qKlPZZwlcPC9znndi8shA7zPqSPW/yXpWtVqWeS+pt0aTcfaJaF2jjCgKBYAAAdAKOwAuSABzNdqq3bzsNh+Jxqst0kQ9yVdwCRdT1Bt6bjxqLS0IwIBBuDqCOY8K5rHiw5UAK3dAAAKg2Avta3Vf8AL41z9YBsjG3VlBNvJrXbzsOtAe9K8S0n3V5/aPhbTL+98hvfRlf7y7/dO2b977unnr4UB7V0lkCgsxCgakkgADqSa8xAebsdtNB16C+t+vIevaPDqDcLr1Op2A3Ouyj5UBx7/orHW21udjq1ttTpyGl9K6+6dh32y3GqoTzBBGfQ7m4KhToKyKUB1SMDYAXJOgtqdSfMmu1KUApSlAKUpQClKUBoj3p7w8TULw0HEYhpnUvBhCGIsTnm+yug2X4m6AVkcP4gJCSGuLn8zoa68PjxeFmb6EPepIxZoGGjMbXKndW08tr1r0nGM/fNyupSpe4WTAOBaUyBpXcEurEKWe4WJbfEC12JtoF0HWWw/E5I8y4hQAoU51uQcxsAF3vcH/KdBaoQyQYtxC4kweLiYt7lro2b7wtbP8Nwym9tedMX7yGeP3qu8KKzswY/WzMpVQWBuoW4tse6bcq66eZczhOLg+Ra/o6SqSgVgdytt/Ebg+BrxbFGJViQ/CLE871WRxFlkaNZCk2Vp5WHUC6xc9lNzfr1qWh4mjRo2IWzvmIaNTfIPtuo5aH0FZy95jN3E1DxFXFn3vvpp4+AA+ddjofDkep/2H4k9Kj8Nhr2ZSJE3uuoPgelSXvgUtY+Hn1v/W9QaS2LE29zkEb/ADI/X/esaXEsO9mAAGoI5dfO1dfdnpUZi8Rnui/DzI5+A8KqrVY0o5mXUKUqs1Fd54nEmV87XA+yPujkKv3ZGH6syG12NtOQX/eqRLZFHU6Dzq49iZvq3j+6QfRh/NfxrkUJN1Ls7mJgo0bRLJSlK3zlilKUApSlAKUpQClKUApSlAKUpQClKUApSlAfGMfEHhlco1u835nlW3fYV20BlbB4ixkku0MpCgkgaxEgdBcfxDpWmMX8b/vN+Zrb3st9lErvFjcWzQqrJJFENHYqQQz3HcXTb4jflzy0txd7G4+0PZrDY1MmJhV7fC+zoeqOO8uoGx5VQOJcEx/Drlc/EcIOWn0iMeI2lH468gK2tSik1sYcU9zSvD8FhcU5xOGlIZswlXn3tGDI2qsRfw6Vn8F4qYGk96ksc5mORFClZYsmWOL3hBsitqQOZvzNrf2n7A4fFP79C2GxXLEQ6MTp/eLs40F762Fr1TsbjMVgO7xGHNEDZcZCC0fgZU+KNttdrnSr41VLSRrypOLvE9cHhp1RWhjdoVkKPJGwSxGss1tcwUgIq5SO4w5rWbDxbQCUEszMFMakkquhdlF9L9L15YF5PcCLD4kPhWAyg94oL/8ALkB1G+jX156WrtwbjKxYTEzArDiEe3u3HfEK2EaIL7MftC4uz9BU5SsnKRXGF2oxMPivETISkbd3mwuL+A6AVxg1sBUfwUll11Y3JJ5nrUoy6gVw69RzldnosPSVOFkdQC0x6KAB66n9PlVs7KRH3pI2CkN62sPw/CoJFAF6uvZzBGOK53fveQ5D5fnWcPC8rjE1LQtzJWlKV0DlClKUApSlAKUpQClKUApSlAKUpQClKUApSlAa09n/ALKYsI/0nFZZsQSWVbXSK5vpf4n/AGjtyHM7LpSgFKUoBXWRAwKsAQRYgi4IPIiu1KA13xn2cGJmn4VIMNIdWw7XMEn8O6HxH4VSe0fHiY2w+Kwz4bFqVIRxcMARdopBoRbx+db6rXvtmxQXCxx5FJdycxAJULa+U8ibj0uOdHJqLSMKCck2Vnsycyg+FTIXWqd2a44qgRFDfqCKu0UVxfSubVhKL1R16VSMlozK4RhTLMict28h/VvWtgVXux+EyozndjbyA/3P4CrDW3h4ZYX5mlip5p25ClKVeawpSlAKUpQClKUApSlAKUpQClKUApSlAKUpQH//2Q==",
      alt: "Vehicle tracker installation",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNSJ455yCtIVqsUVSlxQ9DIEFfxFBmuE_PNw&s",
      alt: "Live GPS map on mobile phone",
    },
  ];

  return (
    <div className="gps-tracker-section">
      <div className="container">
        <h2 className="section-title">
          GPS Tracker & Dash Cam Installation & Services
        </h2>
        <p className="section-subtitle">
          Real-time GPS tracking, dash cameras & professional installation
        </p>
        <div className="two-columns">
          <div className="features-panel">
            <h2 className="features-title">Features & Benefits</h2>
            <ul className="features-list">
              {features.map((feature, index) => (
                <li key={index} className="feature-item">
                  <span className="feature-bullet"></span>
                  <span className="feature-text" style={{ color: "white" }}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="images-panel">
            <div className="primary-image">
              <img src={images[0].url} alt={images[0].alt} />
            </div>
            <div className="secondary-images">
              {images.slice(1).map((image, index) => (
                <div key={index} className="secondary-image">
                  <img src={image.url} alt={image.alt} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="cta-container">
          <button className="cta-button" onClick={() => nav("/tracker-page")}>
            View Our Packages<MdKeyboardDoubleArrowRight /> 
          </button>
        </div>

        <div className="additional-info">
          <h2>Why Choose Our GPS Tracking Solutions?</h2>
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">
                <div className="inner-icon"></div>
              </div>
              <h3>24/7 Monitoring</h3>
              <p>
                Round-the-clock tracking and instant alerts for complete peace
                of mind
              </p>
            </div>
            <div className="info-card">
              <div className="info-icon">
                <div className="inner-icon"></div>
              </div>
              <h3>Professional Setup</h3>
              <p>
                Expert installation by certified technicians ensures optimal
                performance
              </p>
            </div>
            <div className="info-card">
              <div className="info-icon">
                <div className="inner-icon"></div>
              </div>
              <h3>Mobile Control</h3>
              <p>
                Manage your vehicle from anywhere using our intuitive mobile app
              </p>
            </div>
          </div>
        </div>

        <div className="service-details">
          <div className="service-card">
            <h3>Installation Services</h3>
            <ul>
              <li>Same-day installation available</li>
              <li>Certified technicians with 10+ years experience</li>
              <li>Discreet installation for maximum security</li>
              <li>Compatible with all vehicle makes and models</li>
              <li>1-year warranty on all installations</li>
            </ul>
          </div>

          <div className="service-card">
            <h3>Monitoring Features</h3>
            <ul>
              <li>Live location updates every 10 seconds</li>
              <li>Historical route playback up to 12 months</li>
              <li>Instant SMS and email notifications</li>
              <li>Multi-vehicle fleet management</li>
              <li>Detailed reports and analytics</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
