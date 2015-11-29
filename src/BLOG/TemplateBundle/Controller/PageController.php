<?php

namespace BLOG\TemplateBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use BLOG\TemplateBundle\Entity\Base;

class PageController extends Controller{
	
    public function indexAction(){	
		
		$repository = $this->getDoctrine()->getManager()->getRepository('BLOGTemplateBundle:Base');
		$base_all = $repository->findAll();

		if (null === $base_all) {
			throw new NotFoundHttpException("L'annonce d'id ".$id." n'existe pas.");
		}

		return $this->render('BLOGTemplateBundle:Page:index.html.twig', array('base_all' => $base_all));
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
	   
		$form->handleRequest($request);
				
	    if ($form->isValid()) {		 
		  $em = $this->getDoctrine()->getManager();
		  $em->persist($base);
		  $em->flush();

		  $request->getSession()->getFlashBag()->add('notice', 'Article bien enregistré.');		 
		  return $this->redirect($this->generateUrl('blog_template_view', array('id' => $base->getId())));
		}	
		
		return $this->render('BLOGTemplateBundle:Page:add.html.twig', array('form' => $form->createView(),));
	}
	
	
	
	public function viewAction($id){
    
		$repository = $this->getDoctrine()->getManager()->getRepository('BLOGTemplateBundle:Base');
		$base = $repository->find($id);

		if (null === $base) {
			throw new NotFoundHttpException("L'annonce d'id ".$id." n'existe pas.");
		}
		
		return $this->render('BLOGTemplateBundle:Page:view.html.twig', array('base' => $base));
    }
 
  
	  
	public function editAction($id, Request $request){

		$em = $this->getDoctrine()->getManager();		
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
		return $this->render('BLOGTemplateBundle:Page:delete.html.twig', array('base' => $base,'form'   => $form->createView() ));

    }

 
}
