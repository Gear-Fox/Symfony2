<?php

namespace ESIEA\testBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class ColorController extends Controller
{
    public function indexAction($color)
    {
        return $this->render('ESIEAtestBundle:Default:testcolor.html.twig', array('color' => $color));
    }
}
