<?php

namespace BLOG\TemplateBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use BLOG\TemplateBundle\Entity\Base;

class PageController extends Controller{
	
    public function indexAction(){	

		// On récupère le repository
		$repository = $this->getDoctrine()->getManager()->getRepository('BLOGTemplateBundle:Base');

		// On récupère l'entité correspondante à l'id $id
		$base_all = $repository->findAll();

		// $advert est donc une instance de OC\PlatformBundle\Entity\Advert
		// ou null si l'id $id  n'existe pas, d'où ce if :
		if (null === $base_all) {
			throw new NotFoundHttpException("L'annonce d'id ".$id." n'existe pas.");
		}

		// Le render ne change pas, on passait avant un tableau, maintenant un objet
		return $this->render('BLOGTemplateBundle:Page:index.html.twig', array('base_all' => $base_all));

        //return $this->render('BLOGTemplateBundle:Page:index.html.twig');		
    }
	
	public function page_testAction(){		
        return $this->render('BLOGTemplateBundle:Page:page_test.html.twig');		
    }
	
	public function dprintAction(){		
        return $this->render('BLOGTemplateBundle:Page:dprint.html.twig');		
    }
	
	public function aboutAction(){		
        return $this->render('BLOGTemplateBundle:Page:about.html.twig');		
    }
	
	public function contactAction(){		
        return $this->render('BLOGTemplateBundle:Page:contact.html.twig');		
    }
	
	public function addAction(Request $request){    
	    // Création de l'entité
        $base = new Base();
        $base->setTitle('trucRecherche développeur Symfony2.');
		$base->setDate(new \Datetime('NOW'));
        $base->setAuthor('totoAlexandre');
        $base->setContent("Nous recherchons un développeur Symfony2 débutant sur Lyon. Blabla…");

        // On peut ne pas définir ni la date ni la publication,
        // car ces attributs sont définis automatiquement dans le constructeur
        // On récupère l'EntityManager
        $em = $this->getDoctrine()->getManager();

        // Étape 1 : On « persiste » l'entité
        $em->persist($base);

        // Étape 2 : On « flush » tout ce qui a été persisté avant
        $em->flush();

        // Reste de la méthode qu'on avait déjà écrit
        if ($request->isMethod('POST')) {
          $request->getSession()->getFlashBag()->add('notice', 'Annonce bien enregistrée.');
          return $this->redirect($this->generateUrl('blog_template_view', array('id' => $base->getId())));
        }

        return $this->render('BLOGTemplateBundle:Page:add.html.twig');
  }
	
	public function viewAction($id){
    
    // On récupère le repository
    $repository = $this->getDoctrine()->getManager()->getRepository('BLOGTemplateBundle:Base');

    // On récupère l'entité correspondante à l'id $id
    $base = $repository->find($id);

    // $advert est donc une instance de OC\PlatformBundle\Entity\Advert
    // ou null si l'id $id  n'existe pas, d'où ce if :
    if (null === $base) {
        throw new NotFoundHttpException("L'annonce d'id ".$id." n'existe pas.");
    }

    // Le render ne change pas, on passait avant un tableau, maintenant un objet
    return $this->render('BLOGTemplateBundle:Page:view.html.twig', array('base' => $base));

  }
 
}
