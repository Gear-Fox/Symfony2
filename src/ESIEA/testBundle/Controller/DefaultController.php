<?php

namespace ESIEA\testBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('ESIEAtestBundle:Default:index.html.twig', array('name' => $name));
    }
}
