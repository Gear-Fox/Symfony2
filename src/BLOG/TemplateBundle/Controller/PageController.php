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
<<<<<<< HEAD
=======

        //return $this->render('BLOGTemplateBundle:Page:index.html.twig');		
>>>>>>> e018118032b7aced85cc291e0ba63f74affd730b
    }
	
	public function page_testAction(){		
        return $this->render('BLOGTemplateBundle:Page:page_test.html.twig');		
    }
	
<<<<<<< HEAD
	public function dprintAction(){		
        return $this->render('BLOGTemplateBundle:Page:dprint.html.twig');		
    }
	
=======
>>>>>>> e018118032b7aced85cc291e0ba63f74affd730b
	public function aboutAction(){		
        return $this->render('BLOGTemplateBundle:Page:about.html.twig');		
    }
	
	public function contactAction(){		
        return $this->render('BLOGTemplateBundle:Page:contact.html.twig');		
    }
	
	public function addAction(Request $request){    
<<<<<<< HEAD

		$base = new Base();		
		$base->setDate(new \Datetime());		
		
		$formBuilder = $this->get('form.factory')->createBuilder('form', $base);	
		$formBuilder
		  ->add('date',      'date')
		  ->add('title',     'text')
		  ->add('content',   'textarea')
		  ->add('author',    'text')
		  ->add('published', 'checkbox')
		  ->add('save',      'submit');		  
		$form = $formBuilder->getForm();
				
	    // On fait le lien Requête <-> Formulaire
		// À partir de maintenant, la variable $advert contient les valeurs entrées dans le formulaire par le visiteur
		$form->handleRequest($request);
		
		
		// On vérifie que les valeurs entrées sont correctes
		// (Nous verrons la validation des objets en détail dans le prochain chapitre)

		if ($form->isValid()) {
		  // On l'enregistre notre objet $advert dans la base de données, par exemple
		  $em = $this->getDoctrine()->getManager();
		  $em->persist($base);
		  $em->flush();

		  $request->getSession()->getFlashBag()->add('notice', 'Article bien enregistré.');
		  // On redirige vers la page de visualisation de l'annonce nouvellement créée
		  return $this->redirect($this->generateUrl('blog_template_view', array('id' => $base->getId())));
		}
		
		// On passe la méthode createView() du formulaire à la vue
		// afin qu'elle puisse afficher le formulaire toute seule
		return $this->render('BLOGTemplateBundle:Page:add.html.twig', array('form' => $form->createView(),));

	}
		
	
=======
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
>>>>>>> e018118032b7aced85cc291e0ba63f74affd730b
	
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
<<<<<<< HEAD
  
  
  
public function editAction($id, Request $request){

    $em = $this->getDoctrine()->getManager();
    // On récupère l'annonce $id
    $base = $em->getRepository('BLOGTemplateBundle:Base')->find($id);


    if (null === $base) {
      throw new NotFoundHttpException("L'objet d'id ".$id." n'existe pas.");
    }

	
		
    $form = $this->createForm(new BaseEditType(), $base);
	
    if ($form->handleRequest($request)->isValid()) {
      $em->flush();
      $request->getSession()->getFlashBag()->add('notice', 'Objet bien modifiée.');
      return $this->redirect($this->generateUrl('blog_template_view', array('id' => $base->getId())));

    }
    return $this->render('BLOGTemplateBundle:Base:edit.html.twig', array('form'   => $form->createView(),'base' => $base));

  }
  
  
  
  
  public function deleteAction($id, Request $request){

    $em = $this->getDoctrine()->getManager();

    // On récupère l'annonce $id
    $base = $em->getRepository('BLOGTemplateBundle:Base')->find($id);

    if (null === $base) {
      throw new NotFoundHttpException("L'objet d'id ".$id." n'existe pas.");
    }

    $form = $this->createFormBuilder()->getForm();

    if ($form->handleRequest($request)->isValid()) {
      $em->remove($base);
      $em->flush();
      $request->getSession()->getFlashBag()->add('info', "L'objet a bien été supprimée.");
      return $this->redirect($this->generateUrl('blog_template_homepage'));
    }

    // Si la requête est en GET, on affiche une page de confirmation avant de supprimer
    return $this->render('BLOGTemplateBundle:Page:delete.html.twig', array('base' => $base,'form'   => $form->createView() ));

  }
=======
>>>>>>> e018118032b7aced85cc291e0ba63f74affd730b
 
}
